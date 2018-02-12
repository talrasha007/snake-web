<template>
  <div>
    <div class="breed">
      <div class="placeholder"></div>
      <snake-desc :snake="picked" v-if="src" />
      <font-awesome-icon class="love" :icon="['fas', 'heart']" />
      <snake-desc :snake="src" v-if="src" />
      <div class="placeholder"></div>
    </div>
    <promise-button :click="breed">给它们点空间</promise-button>
    <h4>候选蛇</h4>
    <div class="snake-list">
      <snake-desc class="md" v-for="snake in candidates" :key="snake.id" :snake="snake" v-on:click.native="() => picked = snake" />
    </div>
  </div>
</template>

<script>
import web3, { contract } from '../../lib/web3';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import SnakeDesc from '../controls/SnakeDesc';
import PromiseButton from '../controls/PromiseButton';

export default {
  name: 'breed',

  props: ['src'],

  methods: {
    async refresh() {
      await contract.waitForInit;
      const candidates = await contract.snakeCore.listByUser(web3.eth.accounts[0]);
      for (const c of candidates) {
        Object.assign(c, await contract.snakeCore.getSnakeInfo(c.id));
      }

      this.candidates = candidates.filter(
        s =>
          s.id.toString() !== this.$route.params.id.toString() &&
          s.nextActionAt <= Date.now() / 1000 &&
          !s.siringWithId
      );
    },

    async breed() {
      const matron = this.picked;
      const matronOwner = await contract.snakeCore.getOwner(matron);

      const sire = this.$props.src;
      const sireOwner = await contract.snakeCore.getOwner(sire);

      if (matronOwner === sireOwner) {
        await contract.snakeCore.breedWith(matron.id, sire.id);
      } else {
        await contract.snakeCore.bidOnSiringAuction(sire.id, matron.id, { value: sire.siring.currentPrice });
      }

      this.$props.src.$emit('executed');
    }
  },

  data() {
    this.refresh();

    return {
      picked: { id: '挑选配对的蛇' },
      candidates: []
    };
  },

  components: {
    SnakeDesc,
    FontAwesomeIcon,
    PromiseButton
  }
}
</script>

<style scoped lang="scss">
.breed, .snake-list {
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  .love {
    width: 30px;
    height: 30px;
    color: pink;
    z-index: 999;
    margin: -10px;
  }
}

h4 {
  text-align: left;
}
</style>
