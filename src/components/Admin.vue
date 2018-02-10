<template>
  <div>
    <form action="javascript:void(0)">
      <div v-if="eth.account === eth.ceoAddress">
        <h4>CEO操作</h4>
        <select v-model="ceoOp.type" title="OP">
          <option value="setCFO">setCFO</option>
          <option value="setCOO">setCOO</option>
        </select>
        <input type="text" v-model="ceoOp.address" placeholder="address" size="50" />
        <a class="button" v-on:click="() => op.ceo[ceoOp.type](ceoOp.address)">提交</a>
      </div>

      <div v-if="eth.account === eth.cfoAddress">
        <h4>CFO操作</h4>
      </div>
    </form>
  </div>
</template>

<script>
import web3, { contract } from '../lib/web3';

const eth = {
  account: web3.eth.accounts[0],
  ceoAddress: '', cooAddress: '', cfoAddress: ''
};

const op = {
  ceo: {
    setCFO: async addr => updateInfoAfterTx(await contract.kittyCore.setCFO(addr)),
    setCOO: addr => contract.kittyCore.setCOO(addr)
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
    ceoAddress: await contract.kittyCore.ceoAddress(),
    cooAddress: await contract.kittyCore.cooAddress(),
    cfoAddress: await contract.kittyCore.cfoAddress()
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

  .button {
    padding: 10px;
    color: white;
    background-color: #fba371;
    font-size: 0.8em;
  }

  select {
    height: 35px;
  }
}
</style>
