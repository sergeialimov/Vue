import { shallowMount } from '@vue/test-utils';
import ButtonAmount from './Button-amount.vue';

describe('Button', () => {
  it('renders currency symbol and amount when passed', () => {
    const value = '100';
    const selected = false;
    const currencySymbol = '$';
    const mockCallBack = jest.fn();

    const expectedText = `${currencySymbol} ${value}`;

    const wrapper = shallowMount(ButtonAmount, {
      props: {
        value, selected, currencySymbol, callback: mockCallBack,
      },
    });
    expect(wrapper.text()).toMatch(expectedText);
  });

  it('clicks on button and callback was called', async () => {
    const value = '100';
    const selected = false;
    const currencySymbol = '$';
    const mockCallBack = jest.fn();

    const wrapper = shallowMount(ButtonAmount, {
      props: {
        value, selected, currencySymbol, callback: mockCallBack,
      },
    });

    await wrapper.trigger('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
    expect(mockCallBack).toHaveBeenCalledWith(+value);
  });
});
