<template>
  <div>
    <form action="javascript:void(0)">
      <div v-if="eth.account === eth.ceoAddress">
        <h4>CEO操作</h4>
        <promise-button v-if="eth.isPaused !== null" :click="() => op.ceo.setPaused(!eth.isPaused)">{{eth.isPaused ? '恢复' : '暂停'}}</promise-button>
        <select v-model="ceoOp.type" title="OP">
          <option value="setCFO">setCFO</option>
          <option value="setCOO">setCOO</option>
        </select>
        <input type="text" v-model="ceoOp.address" placeholder="address" size="50" />
        <promise-button :click="() => op.ceo[ceoOp.type](ceoOp.address)">提交</promise-button>
      </div>

      <div v-if="eth.account === eth.cooAddress">
        <h4>COO操作</h4>
        <div>
          <promise-button class="button" :disabled="eth.isPaused" :click="op.coo.createGen0AuctionRandom">创建随机0代蛇</promise-button>
        </div>
      </div>

      <div v-if="eth.account === eth.cfoAddress">
        <h4>CFO操作</h4>
      </div>
    </form>
  </div>
</template>

<script>
import web3, { contract } from '../lib/web3';
import PromiseButton from './controls/PromiseButton';

const eth = {
  isPaused: null,
  account: web3.eth.accounts[0],
  ceoAddress: '', cooAddress: '', cfoAddress: ''
};

const op = {
  ceo: {
    setCFO: async addr => await updateInfoAfterTx(await contract.snakeCore.setCFO(addr)),
    setCOO: async addr => await updateInfoAfterTx(await contract.snakeCore.setCOO(addr)),
    setPaused: async paused => {
      await updateInfoAfterTx(
        paused ? await contract.snakeCore.pause() : await contract.snakeCore.unpause()
      );
    }
  },
  coo: {
    createGen0AuctionRandom: () => contract.snakeCore.createGen0AuctionRandom()
  }
};

async function updateInfoAfterTx(txHash) {
  await contract.waitForTx(txHash);
  await updateInfo();
}

async function updateInfo() {
  await contract.waitForInit;

  Object.assign(eth, {
    account: web3.eth.accounts[0],
    isPaused: await contract.snakeCore.paused(),
    ceoAddress: await contract.snakeCore.ceoAddress(),
    cooAddress: await contract.snakeCore.cooAddress(),
    cfoAddress: await contract.snakeCore.cfoAddress()
  });
}

updateInfo();

export default {
  name: 'Admin',

  data() {
    return {
      eth,
      op,
      ceoOp: {
        address: '',
        type: 'setCFO'
      }
    };
  },

  components: {
    PromiseButton
  }
}
</script>

<style scoped lang="scss">
form {
  text-align: left;
  margin: 30px;

  input, select, button {
    padding: 10px;
    border: 1px solid #f3f1ee;
  }

  select {
    height: 35px;
  }
}
</style>
