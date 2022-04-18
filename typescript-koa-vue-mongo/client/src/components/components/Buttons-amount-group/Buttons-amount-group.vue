<template>
  <div class="group">
    <ButtonAmount
      v-for="preset of Object.keys(presets)"
      v-bind:value="preset"
      v-bind:selected="presets[preset]"
      v-bind:currencySymbol="currencySymbol"
      v-bind:callback="presetButtonCallback"
      v-bind:key="preset"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useStore } from 'vuex';
import ButtonAmount from './Button-amount/Button-amount.vue';
import currencyService from '../../../services/currency.service';
import presetsOriginal from '../../../assets/presets';

type presetsTypeRef = Ref<{ [index: number]: boolean }>;

export default defineComponent({
  name: 'ButtonsAmountGroup',
  components: {
    ButtonAmount,
  },

  setup() {
    const presets: presetsTypeRef = ref(presetsOriginal);
    const store = useStore();
    const selected = ref();
    const currencyCode = ref(store.getters.getCurrencyCode);
    const currencySymbol = ref(currencyService.getCurrencySymbol(currencyCode.value));

    const disableButton = (amount: number) => {
      presets.value[amount] = false;
    };

    const enableButton = (amount: number) => {
      presets.value[amount] = true;
    };

    const toggleButtonsOnManualInput = (amount: number) => {
      if (!Object.keys(presets.value).includes(amount.toString())) {
        selected.value && disableButton(selected.value);
        return;
      }
      selected.value && disableButton(selected.value);
      enableButton(amount);
      selected.value = amount;
    };

    const presetButtonCallback = (amount: number) => {
      if (selected.value === undefined) {
        enableButton(amount);
        selected.value = amount;
      } else if (selected.value && selected.value !== amount) {
        disableButton(selected.value);
        enableButton(amount);
        selected.value = amount;
      }

      store.commit('setDonationSumByButton', amount);
    };

    store.subscribe(({ type, payload }) => {
      if (type === 'setDonationSumByInput') {
        toggleButtonsOnManualInput(+payload);
      } else if (type === 'setCurrencyCode') {
        selected.value && disableButton(selected.value);
        selected.value = undefined;
        presets.value = currencyService.convertPresets(payload);
        currencySymbol.value = currencyService.getCurrencySymbol(payload);
      }
    });

    return {
      presets,
      presetButtonCallback,
      selected,
      currencySymbol,
    };
  },
});
</script>

<style scoped>
  .group {
    grid-template-columns: 1fr 1fr 1fr;
    width: 336px;
    height: 100px;
    margin-top: 50px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
