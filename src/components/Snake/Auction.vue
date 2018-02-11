<template>
  <form action="javascript:void(0)">
    <div class="form-group">
      <label>起始价格</label>
      <input type="number" v-model="startingPrice" placeholder="起始价格" />
    </div>
    <div class="form-group">
      <label>结束价格</label>
      <input type="number" v-model="endingPrice" placeholder="结束价格" />
    </div>
    <div class="form-group">
      <label>持续时间</label>
      <input type="number" v-model="duration" placeholder="天" />
    </div>

    <promise-button class="btn" :click="() => op[$route.name.split('.')[1]](startingPrice, endingPrice, duration)">提交</promise-button>
  </form>
</template>

<script>
import PromiseButton from '../controls/PromiseButton';

export default {
  name: 'auction',

  props: ['op'],

  data() {
    return {
      startingPrice: 0.01,
      endingPrice: 0.005,
      duration: 1
    };
  },

  components: {
    PromiseButton
  }
}
</script>


<style scoped lang="scss">
.form-group {
  padding: 20px;

  label {
    color: #7c7c7b;
  }

  input {
    padding: 10px;
    border: 1px solid #f3f1ee;
    width: 60%;
  }
}

.btn.button {
  position: relative;
  top: 20px;
  padding: 15px 40px;
}
</style>
