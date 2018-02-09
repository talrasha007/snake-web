<template>
  <div id="app">
    <ul class="top-nav">
      <li class="brand">
        <font-awesome-icon :icon="['fab', 'snapchat-ghost']" class="pink" />
        加密贪吃蛇
      </li>
      <li class="placeholder"></li>
      <li class="nav-item" v-for="item in nav1" :key="item.href" :class="{ active: '#' + $route.path === item.href }">
        <a v-bind:href="item.href">{{item.title}}</a>
      </li>
      <li class="placeholder"></li>
      <li class="nav-item" v-for="item in nav2" :key="item.href" :class="{ active: '#' + $route.path === item.href }">
        <a v-bind:href="item.href">{{item.title}}</a>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

const nav1 = [
  { href: '#/my-snake', title: '我的' },
  { href: '#/marketplace', title: '市场' },
  { href: '#/activity', title: '历史' }
];

const nav2 = [
  { href: '#/invite', title: '邀请' },
  { href: '#/about', title: '关于' },
  { href: '#/faq', title: '帮助' }
];

export default {
  name: 'App',

  components: {
    FontAwesomeIcon
  },

  data() {
    return {
      nav1,
      nav2
    };
  }
}
</script>

<style scoped lang="scss">
.top-nav {
  font-weight: bold;
  margin: 10px 30px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;

  .brand {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    font-size: 1.3em;

    .pink {
      width: 40px;
      height: 45px;
      margin-right: 10px;
    }
  }

  .placeholder {
    flex-grow: 1;
  }

  .nav-item {
    font-size: 1.1em;

    a {
      display: block;
      margin: 0 18px;
      padding-bottom: 5px;
      color: #2a2825;
      text-decoration: none;
    }
  }

  .nav-item.active {
    a {
      color: #ef52d1;
      box-shadow: 0 0.1em 0 0 #ef52d1;
    }
  }
}
</style>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2a2825;
}

.pink {
  color: #e96bd4;
}
</style>
