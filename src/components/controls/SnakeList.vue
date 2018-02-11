<template>
  <ul>
    <li v-for="(snake, idx) in snakes" :key="snake.id">
      <router-link :to="{ path: '' }">
        <div class="snake-detail" :class="{ ['s' + idx % 5]: true }">
          <div v-if="snake.currentPrice >= 0" class="snake-status">
            <font-awesome-icon class="icon" :icon="['fab', 'ethereum']" />
            <span class="price">&nbsp;{{snake.currentPrice | wei}}</span>
          </div>

        </div>
        <div>
          <span class="snake-id">#{{snake.id}}</span>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import web3 from '../../lib/web3';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';


export default {
  name: 'snake-list',
  props: ['snakes'],
  filters: {
    wei(v) {
      return v >= 0 && Math.floor(web3.fromWei(v) * Math.pow(10, 5)) / Math.pow(10, 5);
    }
  },
  components: {
    FontAwesomeIcon
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

      .snake-detail {
        position: relative;
        width: 280px;
        height: 280px;
        margin: 10px;
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
            color: #7c7c7b;
          }
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
      }

      .snake-id {
        color: #2a2825;
      }
    }
  }
}
</style>
