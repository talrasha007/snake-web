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
        <div class="placeholder" />
        <div class="account">
          <div class="desc">
            <div>{{owner}}</div>
            <h4>主人</h4>
          </div>
          <div>
            <font-awesome-icon :icon="['fab', 'ethereum']" class="icon" />
          </div>
        </div>
      </div>

      <div class="bid-box" v-if="sale">
        <div class="price">
          <div>当前价</div>
          <div>
            <font-awesome-icon class="icon" :icon="['fab', 'ethereum']" />
            {{sale.currentPrice | wei}}
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
            {{sale.startingPrice | wei}}
          </div>
        </div>
        <div>
          <div>结束价</div>
          <div>
            <font-awesome-icon class="icon" :icon="['fab', 'ethereum']" />
            {{sale.endingPrice | wei}}
          </div>
        </div>
        <div class="placeholder" />
        <div>
          <promise-button :click="() => bid()">购买</promise-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import web3, { contract } from '../lib/web3';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import PromiseButton from './controls/PromiseButton';
import { genes, wei, cooldown, duration } from './filters';

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
    }
  },

  computed: {
    timeLeft() {
      return this.sale && Math.max(0, this.sale.startedAt + this.sale.duration - Date.now() / 1000);
    }
  },

  data() {
    this.refresh();

    return {
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
    genes, wei, cooldown, duration
  },

  components: {
    FontAwesomeIcon,
    PromiseButton
  }
}
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
