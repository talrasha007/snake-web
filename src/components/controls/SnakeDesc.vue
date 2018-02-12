<template>
  <div class="snake-container">
    <div class="snake-detail" :class="{ ['s' + ((snake.id % 8) || 0)]: true }">
      <div v-if="snake.sale" class="snake-status">
        <font-awesome-icon class="icon" :icon="['fab', 'ethereum']" />
        <span class="price">&nbsp;{{snake.sale.currentPrice | wei}}</span>
      </div>
      <div v-if="snake.siring" class="snake-status">
        <font-awesome-icon class="icon" :icon="['fas', 'transgender-alt']" />
        <span class="price">&nbsp;{{snake.siring.currentPrice | wei}}</span>
      </div>
      <div v-if="snake.siringWithId || snake.nextActionAt > Date.now() / 1000" class="snake-status">
        <font-awesome-icon class="icon" :icon="['fas', snake.siringWithId ? 'venus-double' : 'clock']" />
        <span class="price">{{snake.nextActionAt - Date.now() / 1000 | duration}}</span>
      </div>
      <div class="genes">{{snake.genes | genes}}</div>
    </div>
    <div class="snake-meta">
      <span class="snake-id">#{{snake.id}}</span>
      <span v-if="snake.generation >= 0">{{snake.generation}}代</span>
      <span v-if="snake.cooldownIndex >= 0">{{snake.cooldownIndex | cooldown}}</span>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { contract } from '../../lib/web3';
import { wei, cooldown, genes, duration } from '../filters';

export default {
  name: 'snake-desc',

  props: ['snake'],

  async beforeMount() {
    const snake = this.$props.snake;

    if (!snake.genes && snake.id >= 0) {
      await contract.waitForInit;
      Object.assign(snake, await contract.snakeCore.getSnakeInfo(snake.id));
    }
  },

  filters: {
    wei, cooldown, genes, duration
  },

  components: {
    FontAwesomeIcon
  }
}
</script>

<style scoped lang="scss">
$large-size: 280px;
$md-size: 200px;
$sm-size: 140px;

.snake-container {
  width: $large-size;
  margin: 0 auto;

  &.md {
    width: $md-size;

    .snake-detail {
      width: $md-size;
      height: $md-size;
    }
  }

  &.sm {
    width: $sm-size;

    .snake-detail {
      width: $sm-size;
      height: $sm-size;
    }

    .genes {
      display: none;
    }
  }

  .snake-detail {
    position: relative;
    width: $large-size;
    height: $large-size;
    margin: 10px 0;
    border-radius: 5px;

    .snake-status {
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.5);
      position: absolute;
      top: 16px;
      left: 50%;
      padding: 5px 15px;
      transform: translate(-50%, 0);
      color: #0b0b0b;

      .price {
        color: #82817d;
      }
    }

    .genes {
      position: absolute;
      top: 50%;
      transform: translate(0, -40%);
      color: #82817d;
      padding: 0 40px;
      word-break: break-all;
    }
  }

  .snake-meta {
    color: #82817d;

    .snake-id {
      color: #2a2825;
    }
  }
}
</style>
