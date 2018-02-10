<template>
  <div class="content">
    <div class="account">
      <div>
        <font-awesome-icon :icon="['fab', 'ethereum']" class="icon" />
      </div>
      <div class="desc">
        <h4>账号</h4>
        <div>0x....</div>
      </div>
    </div>

    <ul class="sub nav">
      <li class="nav-item active"><a>所有</a></li>
    </ul>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'profile',

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

  .icon {
    width: 60px;
    height: 60px;
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
