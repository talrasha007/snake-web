<template>
  <ul>
    <li v-for="(snake, idx) in snakes" :key="snake.id">
      <router-link :to="{ path: '' }">
        <div class="snake-detail" :class="{ ['s' + idx % 8]: true }">
          <div v-if="snake.currentPrice >= 0" class="snake-status">
            <font-awesome-icon class="icon" :icon="['fab', 'ethereum']" />
            <span class="price">&nbsp;{{snake.currentPrice | wei}}</span>
          </div>
          <div class="genes">{{snake.genes | genes}}</div>
        </div>
        <div class="snake-meta">
          <span class="snake-id">#{{snake.id}}</span>
          <span>{{snake.generation}}代</span>
          <span>{{snake.cooldownIndex | cooldown}}</span>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { contract } from '../../lib/web3';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { wei, cooldown, genes } from '../filters';

export default {
  name: 'snake-list',
  props: ['snakes'],
  components: {
    FontAwesomeIcon
  },
  watch: {
    async snakes(arr) {
      let updated = false;
      for (const snake of arr) {
        if (!snake.genes) {
          Object.assign(
            snake,
            await contract.snakeCore.getSnakeInfo(snake.id)
          );

          updated = true;
        }
      }

      if (updated) {
        arr.push(arr.pop());
      }
    }
  },
  filters: {
    wei,
    cooldown,
    genes
  }
}
</script>

<style scoped lang="scss">
ul {
  text-align: center;
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;

  li {
    flex-grow: 1;

    a {
      cursor: pointer;
      text-decoration: none;
      display: block;

      .snake-detail {
        position: relative;
        width: 280px;
        height: 280px;
        margin: 10px auto;
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
          color: #82817d;
          padding: 120px 40px;
          word-break: break-all;
        }

        &.s0 {
          background-color: #d1eeeb;
        }

        &.s1 {
          background-color: #fde9e4;
        }

        &.s2 {
          background-color: #dfdffa;
        }

        &.s3 {
          background-color: #cdf5d4;
        }

        &.s4 {
          background-color: #d3e8ff;
        }

        &.s5 {
          background-color: #faf4cf;
        }

        &.s6 {
          background-color: #d3e8ff;
        }

        &.s7 {
          background-color: #efe1da;
        }
      }

      .snake-meta {
        color: #82817d;

        .snake-id {
          color: #2a2825;
        }
      }
    }
  }
}
</style>
