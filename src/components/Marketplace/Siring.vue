<template>
  <div>
    <snake-list :snakes="snakes" />
  </div>
</template>

<script>
import SnakeList from '../controls/SnakeList';
import { contract } from '../../lib/web3';

export default {
  name: 'siring',

  components: {
    SnakeList
  },

  data() {
    this.refresh();

    return {
      snakes: []
    };
  },

  methods: {
    async refresh() {
      await contract.waitForInit;
      this.snakes = await contract.siringAuction.listAll();
    }
  }
}
</script>

<style scoped lang="scss">
</style>
