import promisify from 'es6-promisify';
import Web3 from 'web3';
import { sleep } from './util';

let web3, contract = {};

if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
  web3.eth.defaultAccount = web3.eth.accounts[0];

  web3.eth.getBalance = promisify(web3.eth.getBalance);
  web3.eth.getBlockNumber = promisify(web3.eth.getBlockNumber);
  web3.eth.getBlock = promisify(web3.eth.getBlock);
  web3.eth.getTransactionReceipt = promisify(web3.eth.getTransactionReceipt);

  function loadContract(abi, address) {
    const instance = web3.eth.contract(abi).at(address);

    abi.forEach(api => {
      if (api.type === 'function') {
        instance[api.name] = promisify(instance[api.name]);
      }
    });

    return instance;
  }

  contract.waitForInit = (async function () {
    const snakeCore = contract.snakeCore = loadContract(require('./contract/SnakeCore.json'), process.env.SNAKE_CORE);
    contract.saleAuction = loadContract(require('./contract/SaleClockAuction.json'), await snakeCore.saleAuction());
    contract.siringAuction = loadContract(require('./contract/SiringClockAuction.json'), await snakeCore.siringAuction());
  })();

  contract.waitForTx = async txHash => {
    const oldBlockNum = await web3.eth.getBlockNumber();
    await web3.eth.getTransactionReceipt(txHash);
    while (oldBlockNum === await web3.eth.getBlockNumber())
      await sleep(100);
  }
} else {
  document.location.hash = '#/error';
}

export { contract };
export default web3;
