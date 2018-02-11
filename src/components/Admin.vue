<template>
  <div>
    <form action="javascript:void(0)">
      <div v-if="eth.account === eth.ceoAddress">
        <h4>CEO操作</h4>
        <promise-button v-if="eth.isPaused !== null" :click="() => setPaused(!eth.isPaused)">{{eth.isPaused ? '恢复' : '暂停'}}</promise-button>
        <select v-model="ceoOp.type" title="OP">
          <option value="setCFO">setCFO</option>
          <option value="setCOO">setCOO</option>
        </select>
        <input type="text" v-model="ceoOp.address" placeholder="address" size="50" />
        <promise-button :click="() => this[ceoOp.type](ceoOp.address)">提交</promise-button>
      </div>

      <div v-if="eth.account === eth.cooAddress">
        <h4>COO操作</h4>
        <div>
          <promise-button class="button" :disabled="eth.isPaused" :click="createGen0AuctionRandom">创建随机0代蛇</promise-button>
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

export default {
  name: 'admin',

  data() {
    this.updateInfo();

    return {
      eth: {
        isPaused: null,
        account: web3.eth.accounts[0],
        ceoAddress: '', cooAddress: '', cfoAddress: ''
      },
      ceoOp: {
        address: '',
        type: 'setCFO'
      }
    };
  },

  methods: {
    // CEO
    async setCFO(addr) { await this.updateInfoAfterTx(await contract.snakeCore.setCFO(addr)); },
    async setCOO(addr) { await this.updateInfoAfterTx(await contract.snakeCore.setCOO(addr)); },
    async setPaused(paused) {
      await this.updateInfoAfterTx(
        paused ? await contract.snakeCore.pause() : await contract.snakeCore.unpause()
      );
    },

    // COO
    async createGen0AuctionRandom() { await contract.snakeCore.createGen0AuctionRandom(); },

    async updateInfo() {
      await contract.waitForInit;

      Object.assign(this.eth, {
        account: web3.eth.accounts[0],
        isPaused: await contract.snakeCore.paused(),
        ceoAddress: await contract.snakeCore.ceoAddress(),
        cooAddress: await contract.snakeCore.cooAddress(),
        cfoAddress: await contract.snakeCore.cfoAddress()
      });
    },

    async updateInfoAfterTx(txHash) {
      await contract.waitForTx(txHash);
      await this.updateInfo();
    }
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
