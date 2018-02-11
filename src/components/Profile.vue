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
  </div>
</template>

<script>
import web3 from '../lib/web3';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'profile',

  data() {
    return {
      account: web3.eth.accounts[0]
    }
  },

  components: {
    FontAwesomeIcon
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
