<template>
  <a class="button" :class="{ disabled }" v-on:click="() => onClick(click)">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'promise-button',

  props: {
    click: Function
  },

  data() {
    return {
      disabled: false,
      onClick: async (fn) => {
        if (!this.disabled) {
          this.disabled = true;
          try {
            await fn();
          } catch (e) {
            console.log(e);
          }
          this.disabled = false;
        }
      }
    };
  }
}
</script>

<style scoped lang="scss">
.button {
  padding: 10px;
  color: white;
  background-color: #fba371;
  font-size: 0.8em;

  &.disabled {
    background-color: #ddd;
  }
}
</style>
