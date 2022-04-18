<template>
  <button
    @click="toggle"
    :class="{active: selected}"
  >
    <span :class="{active: selected}">
      {{`${currencySymbol} ${Number(value).toLocaleString('en-US')}`}}
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonAmount',
  props: {
    value: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
    },
    currencySymbol: {
      type: String,
      required: true,
    },
    callback: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const toggle = () => {
      props.callback(+props.value);
    };

    return {
      toggle,
    };
  },
});
</script>

<style scoped>
  button {
    width: 80px;
    height: 40px;
    margin: 5px 5px 5px 5px;
    padding-right: 0px;
    padding-left: 0px;
    background: #FFF;
    border: 0;
    border-radius: 5px;
  }
  span {
    font-size: 16px;
    font-weight: 500;
    color: #515151;
    line-height: 23px;
  }
  .active {
    background: #4c85db;
    color: #FFF;
  }
</style>
