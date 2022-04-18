import sinon from 'ts-sinon';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { DonationController } from '../../src/controller';
import DonationModel from '../../src/db/donations/donation.model';

sinon
  .stub(DonationModel, 'create')
  .callsFake(() => new Promise((resolve) => resolve(null)));

describe('Donation controller, positive test', () => {
  test('donate method should return 200 and correct', async () => {
    const ctx = createMockContext({
      method: 'POST',
      url: '/donate',
      requestBody: {
        currency: 'USD',
        amount: 5,
      },
    });
    await DonationController.donate(ctx);
    const { response, body } = ctx;
    expect(response.status).toEqual(200);
    expect(body).toEqual({ ok: true });
  });
});

describe('Donation controller, negative tests', () => {
  test('missing currency', async () => {
    const ctx = createMockContext({
      method: 'POST',
      url: '/donate',
      requestBody: {
        amount: 5,
      },
    });
    await DonationController.donate(ctx);
    const { response, body } = ctx;
    expect(response.status).toEqual(400);
    expect(body).toEqual({
      ok: false,
      /* eslint-disable @typescript-eslint/quotes */
      error: `"currency" is required`,
    });
  });

  test('missing amount', async () => {
    const ctx = createMockContext({
      method: 'POST',
      url: '/donate',
      requestBody: {
        amount: 5,
      },
    });
    await DonationController.donate(ctx);
    const { response, body } = ctx;
    expect(response.status).toEqual(400);
    expect(body).toEqual({
      ok: false,
      error: `"currency" is required`,
    });
  });

  test('amount is less than 5', async () => {
    const ctx = createMockContext({
      method: 'POST',
      url: '/donate',
      requestBody: {
        currency: 'USD',
        amount: 4,
      },
    });
    await DonationController.donate(ctx);
    const { response, body } = ctx;
    expect(response.status).toEqual(400);
    expect(body).toEqual({
      ok: false,
      error: `"amount" must be greater than or equal to 5`,
    });
  });
});
