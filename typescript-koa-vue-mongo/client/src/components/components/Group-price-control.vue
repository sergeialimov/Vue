<template>
  <div class="group-price-control">
    <label for="">{{currencySymbol}}</label>
    <div>
      <input
        type="text"
        placeholder="Other"
        inputmode="numeric"
        v-model="inputText"
      >
    </div>
    <div>
      <select
        name="currencies"
        id="currencies-id"
        v-if="currencies"
        @change="onChangeSelect"
      >
        <option
          v-for="currency of currencies"
          v-bind:currency="currency.code"
          v-bind:key="currency"
          :value="currency.code"
        >
        {{`${currency.code} | ${currency.name}`}}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import {
  defineComponent,
  ref,
  watch,
} from 'vue';
import currencies from '../../assets/currencies';
import currencyService from '../../services/currency.service';

export default defineComponent({
  name: 'GroupPriceControl',
  setup() {
    const store = useStore();
    const donationSum = ref(store.getters.getDonationSum);
    const currencyCode = ref(store.getters.getCurrencyCode);
    const selectedCurrency = ref(currencyCode);
    const currencySymbol = ref(currencyService.getCurrencySymbol(currencyCode.value));
    const inputText = ref('');

    watch(inputText, (text: string) => {
      const formatted = text.replace(/^0+|\D/, '');
      inputText.value = formatted;
      store.commit('setDonationSumByInput', Number(formatted));
      donationSum.value = Number(formatted);
    });

    watch(donationSum, (sum: number) => {
      store.commit('setDonationSumByInput', sum);
    });

    store.subscribe(({ payload, type }) => {
      if (type === 'setDonationSumByButton') {
        donationSum.value = payload;
        inputText.value = payload.toString();
      }
    });

    const onChangeSelect = (e: Event) => {
      const target = e.target as HTMLSelectElement;
      if (target.value) {
        const convertedSum = currencyService.convertToCurrency(
          donationSum.value,
          selectedCurrency.value, // current currency
          target.value, // desired currency
        );
        donationSum.value = convertedSum;
        inputText.value = convertedSum.toString();
        store.commit('setCurrencyCode', target.value);
        selectedCurrency.value = target.value;
        currencySymbol.value = currencyService.getCurrencySymbol(currencyCode.value);
      }
    };

    return {
      donationSum,
      currencySymbol,
      currencies,
      selectedCurrency,
      onChangeSelect,
      inputText,
    };
  },
});
</script>

<style scoped>
  .group-price-control {
    width: 262px;
    height: 50px;
    display: flex;
    margin: 20px auto 50px auto;
    background: #fff;
    border-radius: 5px;
    border: 1px solid rgb(96, 94, 94);
  }
  label {
    margin-left: 10px;
    margin-top: 10px;
    font-size: 21px;
  }
  input {
    margin-left: 10px;
    height: 48px;
    width: 140px;
    padding-left: 10px;
    font-size: 26px;
    font-weight: 400;
    color: #4c85db;
    border: none;
  }
  input:focus {
    outline-width: 0;
  }
  select {
    margin-left: 10px;
    margin-top: 10px;
    height: 35px;
    width: 50px;
    border: none;
  }
  select:focus {
    outline-width: 0;
  }
</style>
