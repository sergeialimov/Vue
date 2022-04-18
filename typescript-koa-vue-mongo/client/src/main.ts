import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';

interface stateInterface {
  donationSum: number,
  currencyCode: string,
}

const store = createStore({
  state() {
    return {
      donationSum: 0,
      currencyCode: 'USD',
    };
  },
  mutations: {
    setDonationSumByInput(state: stateInterface, sum: number) {
      state.donationSum = sum;
    },
    setDonationSumByButton(state: stateInterface, sum: number) {
      state.donationSum = sum;
    },
    setCurrencyCode(state: stateInterface, code: string) {
      state.currencyCode = code;
    },
  },
  getters: {
    getDonationSum(state: stateInterface) {
      return state.donationSum;
    },
    getCurrencyCode(state: stateInterface) {
      return state.currencyCode;
    },
  },
});

createApp(App).use(store).mount('#app');
