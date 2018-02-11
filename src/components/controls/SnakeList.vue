<template>
  <ul>
    <li v-for="(snake, idx) in snakes" :key="snake.id">
      <router-link :to="{ path: '' }">
        <div class="snake-detail" :class="{ ['s' + idx % 5]: true }">

        </div>
        <div>
          <span class="snake-id">#{{snake.id}}</span>
        </div>
      </router-link>
      <!--{{snake}}-->
    </li>
  </ul>
</template>

<script>
export default {
  name: 'snake-list',
  props: ['snakes']
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

      .snake-detail {
        width: 280px;
        height: 280px;
        margin: 10px;
        border-radius: 5px;

        &.s0 {
          background-color: #d1eeeb;
        }

        &.s1 {
          background-color: #fde9e4;
        }

        &.s2 {
          background-color: #dfdffa;
        }

        &.s3 {
          background-color: #cdf5d4;
        }

        &.s4 {
          background-color: #d3e8ff;
        }
      }

      .snake-id {
        color: #2a2825;
      }
    }
  }
}
</style>
