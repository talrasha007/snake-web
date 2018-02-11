<template>
  <div class="bid-box" v-if="data.sale">
    <div class="price">
      <div>当前价</div>
      <div>
        <font-awesome-icon class="icon" :icon="['fab', 'ethereum']" />
        {{data.sale.currentPrice | wei}}
      </div>
    </div>
    <div>
      <div>剩余时间</div>
      <div>{{timeLeft | duration}}</div>
    </div>
    <div>
      <div>起始价</div>
      <div>
        <font-awesome-icon class="icon" :icon="['fab', 'ethereum']" />
        {{data.sale.startingPrice | wei}}
      </div>
    </div>
    <div>
      <div>结束价</div>
      <div>
        <font-awesome-icon class="icon" :icon="['fab', 'ethereum']" />
        {{data.sale.endingPrice | wei}}
      </div>
    </div>
    <div class="placeholder"></div>
    <div>
      <promise-button :click="() => op.bid()">购买</promise-button>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import PromiseButton from '../controls/PromiseButton';
import { wei, duration } from '../filters';

export default {
  name: 'info',

  props: ['data', 'op'],

  computed: {
    timeLeft() {
      const sale = this.$props.data.sale;
      return sale && Math.max(0, sale.startedAt + sale.duration - Date.now() / 1000);
    }
  },

  filters: {
    wei, duration
  },

  components: {
    PromiseButton,
    FontAwesomeIcon
  }
}
</script>

<style scoped lang="scss">
.bid-box {
  text-align: left;
  margin-top: 30px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  color: #82817d;

  > div {
    margin: 10px;
    font-size: 1.6em;

    div:first-child {
      font-size: 0.7em;
    }
  }

  .price {
    color: #2a2825;
  }

  .button {
    padding: 15px 30px;
  }
}
</style>
