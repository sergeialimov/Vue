<template>
  <div class="form">
    <ButtonsAmountGroup />
    <GroupPriceControl />
    <ButtonDonate />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ButtonsAmountGroup from './components/Buttons-amount-group/Buttons-amount-group.vue';
import ButtonDonate from './components/Button-donate.vue';
import GroupPriceControl from './components/Group-price-control.vue';

export default defineComponent({
  name: 'Form',
  components: {
    ButtonsAmountGroup,
    ButtonDonate,
    GroupPriceControl,
  },
});
</script>

<style scoped>
  .form {
    width: 336px;
    height: 450px;
    margin: auto;
    top: 0;
    left: 0%;
    bottom: 0;
    right: 0;
    background: #F5F5F7;
    border: 1px solid #F5F5F7;
    border-radius: 5px;
  }
</style>
