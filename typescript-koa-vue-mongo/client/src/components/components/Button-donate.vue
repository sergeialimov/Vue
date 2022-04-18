<template>
  <div>
    <button @click="donate">
      <span>Donate</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import axios, { AxiosResponse } from 'axios';

// Todo: fix usage of config
// import config from 'config';
// const serverConfig: Record<string, string> = config.get('server');
const url = 'http://localhost:3003/';

const sendAlert = (text: string) => {
  /* eslint-disable no-alert */
  alert(text);
};

export default defineComponent({
  name: 'ButtonDonate',
  setup() {
    const store = useStore();

    async function donate() {
      try {
        const donationSum = ref(store.getters.getDonationSum);
        const currencyCode = ref(store.getters.getCurrencyCode);

        if (donationSum.value < 5) {
          sendAlert('The minimum donation amount is $5');
          return;
        }

        const response: AxiosResponse = await axios({
          method: 'post',
          url: `${url}donate`,
          data: {
            amount: donationSum.value,
            currency: currencyCode.value,
          },
        });

        const { status } = response;
        const { data }: Record<string, any> = response;

        if (status === 200 && data.ok) {
          sendAlert('Thank you for your donation!');
        } else {
          sendAlert('Something went wrong, try again later');
        }
      } catch (error) {
        if (!axios.isAxiosError(error)) {
          if (error.response) {
            sendAlert(`Donation cannot be completed\nReason: ${error.response.data}`);
            return;
          }
        }
        sendAlert('Donation cannot be completed');
        console.error(error);
      }
    }
    return {
      donate,
    };
  },
});
</script>

<style scoped>
  button {
    background: #4c85db;
    width: 242px;
    height: 55px;
    border-radius: 5px;
    border: 0;
    margin-top: 70px;
  }
  span {
    font-size: 18px;
    font-weight: 600;
    color: #FFF;
    line-height: 23px;
  }
</style>
