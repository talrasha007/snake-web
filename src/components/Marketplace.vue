<template>
  <div class="content">
    <div class="search">
    </div>

    <ul class="sub nav">
      <li class="nav-item" v-for="item in nav" :key="item.name" :class="{ active: $route.name === item.name }">
        <router-link :to="{ name: item.name }">{{item.title}}</router-link>
      </li>
    </ul>

    <router-view/>
  </div>
</template>

<script>

const nav = [
  { name: 'marketplace.selling', title: '在售' },
  { name: 'marketplace.siring', title: '配种' },
  { name: 'marketplace.gen0', title: '0代' },
  { name: 'marketplace.all', title: '全部' }
];

export default {
  name: 'profile',

  data() {
    return {
      nav
    }
  }
}

import SnakeList from './SnakeList';
export { SnakeList };
</script>

<style scoped lang="scss">
.search {
  margin: 30px 10px;
  text-align: left;
}
</style>
