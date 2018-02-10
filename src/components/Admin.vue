<template>
  <div>
    {{eth.account}} <br>
    {{eth.ceoAddress}}<br>
    {{eth.cooAddress}}<br>
    {{eth.cfoAddress}}<br>
  </div>
</template>

<script>
import web3, { contract } from '../lib/web3';

const eth = {
  account: web3.eth.accounts[0],
  ceoAddress: '', cooAddress: '', cfoAddress: ''
};

(async function () {
  await contract.waitForInit;

  Object.assign(eth, {
    ceoAddress: await contract.kittyCore.ceoAddress(),
    cooAddress: await contract.kittyCore.cooAddress(),
    cfoAddress: await contract.kittyCore.cfoAddress()
  });
})();

export default {
  name: 'Admin',

  data() {
    return {
      eth
    };
  }
}
</script>

<style scoped>

</style>
