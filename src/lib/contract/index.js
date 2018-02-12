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
    snakeCore: extedSnakeCore(snakeCore, saleAuction, siringAuction),
    saleAuction: extendAuction(snakeCore, saleAuction, 'sale'),
    siringAuction: extendAuction(snakeCore, siringAuction, 'siring'),
    async waitForTx(txHash) {
      const oldBlockNum = await web3.eth.getBlockNumber();
      await web3.eth.getTransactionReceipt(txHash);
      while (oldBlockNum === await web3.eth.getBlockNumber())
        await sleep(500);
    }
  };
}

function extedSnakeCore(snakeCore, saleAuction, siringAuction) {
  return Object.assign(snakeCore, {
    async getSnakeInfo(id) {
      const attrs = await snakeCore.getSnake(id);

      return {
        isGestating: attrs[0],
        isReady: attrs[1],
        cooldownIndex: attrs[2].toNumber(),
        nextActionAt: attrs[3].toNumber(),
        siringWithId: attrs[4].toNumber(),
        birthTime: attrs[5].toNumber(),
        matronId: attrs[6].toNumber(),
        sireId: attrs[7].toNumber(),
        generation: attrs[8].toNumber(),
        genes: attrs[9]
      };
    },

    async listByUser(owner) {
      const ret = [];
      const total = await snakeCore.balanceOf(owner);

      for (let idx = total.toNumber() - 1; idx >= 0; idx--) {
        const id = await snakeCore.tokensOfOwnerByIndex(owner, idx);
        ret.push({ id: id.toNumber() });
      }

      return ret;
    },

    async listAll() {
      const ret = [];
      const total = await snakeCore.totalSupply();

      for (let id = total.toNumber(); id >= 0; id--) {
        const sale = await saleAuction.getAuctionInfo(id);
        const siring = await siringAuction.getAuctionInfo(id);
        ret.push({ id, sale, siring });
      }

      return ret;
    }
  });
}

function extendAuction(snakeCore, auction, name) {
  return Object.assign(auction, {
    async getAuctionInfo(id) {
      try {
        const [
          seller,
          startingPrice,
          endingPrice,
          duration,
          startedAt
        ] = (await auction.getAuction(id)).map((v, i) => i > 0 ? v.toNumber() : v);

        const currentPrice = await auction.getCurrentPrice(id);

        return { type: name, seller, currentPrice, startingPrice, endingPrice, duration, startedAt };
      } catch (e) {

      }
    },

    async listAll(uid) {
      const ret = [];
      const total = await snakeCore.totalSupply();

      for (let id = total.toNumber(); id > 0; id--) {
        const info = await auction.getAuctionInfo(id);
        if (info && (!uid || info.seller === uid)) ret.push({ id, [name]: info });
      }

      return ret;
    }
  });
}
