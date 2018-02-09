<template>
  <div id="app">
    <font-awesome-icon :icon="['fab', 'ethereum']"></font-awesome-icon>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'App',

  components: {
    FontAwesomeIcon
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
