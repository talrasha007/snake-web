<template>
  <div class="content">
    <div class="account">
      <div>
        <font-awesome-icon :icon="['fab', 'ethereum']" class="icon" />
      </div>
      <div class="desc">
        <h4>账号</h4>
        <div>{{account}}</div>
      </div>
    </div>

    <ul class="sub nav">
      <li class="nav-item active"><a>所有</a></li>
    </ul>

    <snake-list :snakes="snakes" />
  </div>
</template>

<script>
import web3, { contract } from '../lib/web3';
import SnakeList from './controls/SnakeList';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'profile',

  data() {
    this.refresh();

    return {
      account: this.$route.params.account || web3.eth.accounts[0],
      snakes: []
    };
  },

  methods: {
    async refresh() {
      await contract.waitForInit;

      const account = this.$route.params.account || web3.eth.accounts[0];
      Object.assign(this, {
        account,
        snakes: await contract.snakeCore.listByUser(account)
      });
    }
  },

  components: {
    FontAwesomeIcon,
    SnakeList
  }
}
</script>

<style scoped lang="scss">
.nav {
  border-bottom: 2px solid #f3f1ee;
}

.account {
  margin: 30px 0;
  display: flex;
  flex-flow: row;
  align-items: center;
  text-align: left;

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
</style>
