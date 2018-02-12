<template>
  <div>
    <div class="snake-head" :class="{ ['s' + id % 8]: true }">
      <div v-if="sale" class="snake-status">
        <font-awesome-icon class="icon" :icon="['fab', 'ethereum']" />
        <span class="price">&nbsp;{{sale.currentPrice | wei}}</span>
      </div>
      <span class="genes">{{genes | genes}}</span>
    </div>
    <div class="content">
      <div class="snake-meta">
        <div class="snake-desc">
          <span class="snake-id">#{{id}}</span>
          <span>{{generation}}代</span>
          <span>{{cooldownIndex | cooldown}}</span>
        </div>
        <div class="placeholder"></div>
        <router-link v-if="owner" :to="{ name: 'profile', params: { account: owner } }" class="account">
          <div class="desc">
            <div>{{owner}}</div>
            <h4>主人</h4>
          </div>
          <div>
            <font-awesome-icon :icon="['fab', 'ethereum']" class="icon" />
          </div>
        </router-link>
      </div>

      <ul class="sub nav">
        <li class="placeholder"></li>
        <li class="nav-item" v-for="item in nav" :key="item.name" :class="{ active: $route.name === item.name }">
          <router-link :to="{ name: item.name }">{{item.title}}</router-link>
        </li>
      </ul>

      <router-view :data="{ sale }" :op="{ bid, sell, sire }" />
    </div>
  </div>
</template>

<script>
import { contract } from '../../lib/web3';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { genes, wei, cooldown } from '../filters';

const nav = [
  { name: 'snake.sell', title: '出售' },
  { name: 'snake.sire', title: '配种' },
  { name: 'snake.breed', title: '交配' }
];

export default {
  name: 'snake',

  methods: {
    async refresh() {
      const id = this.$route.params.id;
      await contract.waitForInit;

      Object.assign(this,
        await contract.snakeCore.getSnakeInfo(id),
        {
          sale: await contract.saleAuction.getAuctionInfo(id),
          siring: await contract.siringAuction.getAuctionInfo(id),
          owner: await contract.snakeCore.snakeIndexToOwner(id)
        }
      );
    },

    async bid() {
      await contract.waitForTx(await contract.saleAuction.bid(this.id, { value: this.sale.currentPrice }));
      await this.refresh();
    },

    async sell(startingPrice, endingPrice, duration) {
      startingPrice = web3.toWei(startingPrice);
      endingPrice = web3.toWei(endingPrice);
      duration = duration * 3600 * 24;
      await contract.waitForTx(await contract.snakeCore.createSaleAuction(this.id, startingPrice, endingPrice, duration));
      await this.refresh();
    },

    async sire(startingPrice, endingPrice, duration) {
      startingPrice = web3.toWei(startingPrice);
      endingPrice = web3.toWei(endingPrice);
      duration = duration * 3600 * 24;
      await contract.waitForTx(await contract.snakeCore.createSiringAuction(this.id, startingPrice, endingPrice, duration));
      await this.refresh();
    }
  },

  data() {
    this.refresh();

    return {
      nav,
      id: this.$route.params.id,
      genes: null,
      sale: null,
      siring: null,
      generation: null,
      cooldownIndex: null,
      owner: null
    };
  },

  filters: {
    genes, wei, cooldown
  },

  components: {
    FontAwesomeIcon
  }
}

import Info from './Info';
import Auction from './Auction';
export { Info, Auction };
</script>

<style scoped lang="scss">
.content {
  width: 60%;
  margin: 10px auto;
}

.snake-head {
  margin-top: 30px;
  position: relative;

  .snake-status {
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 16px;
    left: 40px;
    padding: 5px 15px;
    color: #0b0b0b;

    .price {
      color: #82817d;
    }
  }

  .genes {
    line-height: 100px;
  }
}

.snake-meta {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;

  .snake-desc {
    color: #82817d;
    font-size: 1.2em;

    .snake-id {
      color: #2a2825;
    }
  }

  .account {
    display: flex;
    flex-flow: row;
    align-items: center;
    text-align: right;
    text-decoration: none;
    color: #2a2825;

    .icon {
      width: 60px;
      height: 60px;
      color: #82817d;
    }

    .desc {
      h4 {
        margin: 5px;
      }

      > div {
        color: #82817d;
        border-bottom: 1px solid #f3f1ee;
      }
    }
  }
}
</style>