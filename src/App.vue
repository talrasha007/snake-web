<template>
  <div id="app">
    <ul class="nav">
      <li class="brand">
        <!--<font-awesome-icon :icon="['fab', 'snapchat-ghost']" class="icon" />-->
        加密贪吃蛇
      </li>
      <li class="placeholder"></li>
      <li class="nav-item" v-for="item in nav1" :key="item.name || item.href" :class="{ active: (item.match && item.match.test($route.name)) || $route.name ===  item.name }">
        <router-link :to="{ name: item.name, path: item.href }">{{item.title}}</router-link>
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
  { name: 'mySnake', title: '我的' },
  { name: 'marketplace', match: /^marketplace.*$/, title: '市场' },
  { href: '/activity', title: '历史' }
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

.content {
  margin: 10px 30px;
}

.s0 {
  background-color: #d1eeeb;
}

.s1 {
  background-color: #fde9e4;
}

.s2 {
  background-color: #dfdffa;
}

.s3 {
  background-color: #cdf5d4;
}

.s4 {
  background-color: #d3e8ff;
}

.s5 {
  background-color: #faf4cf;
}

.s6 {
  background-color: #d3e8ff;
}

.s7 {
  background-color: #efe1da;
}

.placeholder {
  flex-grow: 1;
}

.nav {
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

    .icon {
      width: 40px;
      height: 45px;
      margin-right: 10px;
    }
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

    &.active {
      a {
        color: #ef52d1;
        box-shadow: 0 0.1em 0 0 #ef52d1;
      }
    }
  }

  &.sub {
    border-bottom: 2px solid #f3f1ee;

    .nav-item {
      a {
        color: #9c9c9b;
      }

      &.active {
        a {
          color: #2a2825;
        }
      }
    }
  }
}
</style>
