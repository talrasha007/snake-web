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
    saleAuction: extendSaleAuction(snakeCore, saleAuction),
    siringAuction,
    async waitForTx(txHash) {
      const oldBlockNum = await web3.eth.getBlockNumber();
      await web3.eth.getTransactionReceipt(txHash);
      while (oldBlockNum === await web3.eth.getBlockNumber())
        await sleep(500);
    }
  };
}

function extendSaleAuction(snakeCore, saleAuction) {
  return Object.assign(saleAuction, {
    async listAll() {
      const ret = [];
      const total = await snakeCore.totalSupply();

      for (let id = total.toNumber(); id > 0; id--) {
        console.log(id);
        try {
          const [
            seller,
            startingPrice,
            endingPrice,
            duration,
            startedAt
          ] = (await saleAuction.getAuction(id)).map((v, i) => i > 0 ? v.toNumber() : v);

          const currentPrice = (await saleAuction.getCurrentPrice(id)).toNumber();

          ret.push({ id, seller, currentPrice, startingPrice, endingPrice, duration, startedAt });
        } catch (e) {

        }
      }

      return ret;
    }
  });
}
