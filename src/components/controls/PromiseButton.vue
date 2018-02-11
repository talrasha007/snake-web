<template>
  <a class="button" :class="{ disabled: isDisabled || disabled }" v-on:click="() => onClick(click)">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'promise-button',

  props: {
    click: Function,
    disabled: Boolean
  },

  data() {
    const self = this;
    return {
      isDisabled: false,
      onClick: async (fn) => {
        if (!this.isDisabled && !self.$props.disabled) {
          this.isDisabled = true;
          try {
            await fn();
          } catch (e) {
            console.log(e);
          }
          this.isDisabled = false;
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
