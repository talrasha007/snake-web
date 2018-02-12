<template>
  <div class="bid-box" v-if="auction">
    <div class="price">
      <div>当前价</div>
      <div>
        <font-awesome-icon class="icon" :icon="['fab', 'ethereum']" />
        {{auction.currentPrice | wei}}
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
        {{auction.startingPrice | wei}}
      </div>
    </div>
    <div>
      <div>结束价</div>
      <div>
        <font-awesome-icon class="icon" :icon="['fab', 'ethereum']" />
        {{auction.endingPrice | wei}}
      </div>
    </div>
    <div class="placeholder"></div>
    <div>
      <promise-button v-if="isMine" :click="cancel">取消</promise-button>
      <promise-button v-if="!isMine && auction.type === 'sale'" :click="bid">购买</promise-button>
      <promise-button v-if="!isMine && auction.type === 'siring'" :click="breed">交配</promise-button>
    </div>
  </div>
</template>

<script>
import web3, { contract } from '../../lib/web3';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import PromiseButton from '../controls/PromiseButton';
import { wei, duration } from '../filters';

export default {
  name: 'info',

  props: ['src'],

  methods: {
    async cancel() {
      const id = this.$route.params.id;
      await contract.waitForTx(
        await contract[`${this.auction.type}Auction`].cancelAuction(id)
      );

      this.$props.src.$emit('executed');
    },

    async bid() {
      const id = this.$route.params.id;
      await contract.waitForTx(await contract.saleAuction.bid(id, { value: this.auction.currentPrice }));

      this.$props.src.$emit('executed');
    },

    async breed() {
      const id = this.$route.params.id;
      this.$router.push({ name: 'snake.breed', params: { id } });
    }
  },

  computed: {
    auction() {
      const data = this.$props.src;
      return data.sale || data.siring;
    },

    timeLeft() {
      const auction = this.auction;
      return auction && Math.max(0, auction.startedAt + auction.duration - Date.now() / 1000);
    },

    isMine() {
      return web3.eth.accounts[0] === this.auction.seller;
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
