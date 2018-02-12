<template>
  <ul>
    <li v-for="snake in snakes" :key="snake.id">
      <router-link :to="{ name: 'snake', params: { id: snake.id } }">
        <snake-desc :snake="snake" />
      </router-link>
    </li>
  </ul>
</template>

<script>
import SnakeDesc from './SnakeDesc';

export default {
  name: 'snake-list',
  props: ['snakes'],

  components: {
    SnakeDesc
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
      display: inline-block;
      margin: 25px 0;
    }
  }
}
</style>
