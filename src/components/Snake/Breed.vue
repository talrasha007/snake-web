<template>
  <div>
    <div class="breed">
      <div class="placeholder"></div>
      <snake-desc :snake="picked" v-if="src" />
      <font-awesome-icon class="love" :icon="['fas', 'heart']" />
      <snake-desc :snake="src" v-if="src" />
      <div class="placeholder"></div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import SnakeDesc from '../controls/SnakeDesc';

export default {
  name: 'breed',

  props: ['src'],

  data() {
    return {
      picked: { id: '挑选配对的蛇' }
    };
  },

  components: {
    SnakeDesc,
    FontAwesomeIcon
  }
}
</script>

<style scoped lang="scss">
.breed {
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  .love {
    width: 30px;
    height: 30px;
    color: pink;
    z-index: 999;
    margin: -10px;
  }
}
</style>
