import promisify from "es6-promisify";
import { sleep } from "../util";

function loadContract(web3, abi, address) {
  const instance = web3.eth.contract(abi).at(address);

  abi.forEach(api => {
    if (api.type === 'function') {
      instance[api.name] = promisify(instance[api.name]);
    }
  });

  return instance;
}

export async function load(web3) {
  const snakeCore = loadContract(web3, require('./SnakeCore.json'), process.env.SNAKE_CORE);
  const saleAuction = loadContract(web3, require('./SaleClockAuction.json'), await snakeCore.saleAuction());
  const siringAuction = loadContract(web3, require('./SiringClockAuction.json'), await snakeCore.siringAuction());

  return {
    snakeCore,
    saleAuction,
    siringAuction,
    async waitForTx(txHash) {
      const oldBlockNum = await web3.eth.getBlockNumber();
      await web3.eth.getTransactionReceipt(txHash);
      while (oldBlockNum === await web3.eth.getBlockNumber())
        await sleep(500);
    }
  };
}
