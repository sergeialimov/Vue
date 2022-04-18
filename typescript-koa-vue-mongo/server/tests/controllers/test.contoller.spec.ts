import { createMockContext } from '@shopify/jest-koa-mocks';
import { TestController } from '../../src/controller';

describe('Test controller', () => {
  test('test method should return code 200 and correct body', async () => {
    const ctx = createMockContext({
      method: 'GET',
      url: '/test',
    });
    await TestController.test(ctx);
    const { response } = ctx;
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('Success');
  });
});
