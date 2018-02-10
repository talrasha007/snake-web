import promisify from 'es6-promisify';
import Web3 from 'web3';

let web3, contract = {};

if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);

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
    const kittyCore = contract.kittyCore = loadContract(require('./contract/KittyCore.json'), '0x432bb747a1b50d5380c121f5e7f9cf47cd01adab');
    contract.saleAuction = loadContract(require('./contract/SaleClockAuction'), await kittyCore.saleAuction());
    contract.siringAuction = loadContract(require('./contract/SiringClockAuction'), await kittyCore.siringAuction());
  })();
} else {
  document.location.hash = '#/error';
}

export { contract };
export default web3;
