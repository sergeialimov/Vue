import { BaseContext } from 'koa';
import {
  description, request, summary, tagsAll,
} from 'koa-swagger-decorator';

@tagsAll(['Test'])
export default class TestController {
  @request('get', '/test')
  @summary('Test endpoint')
  @description('A simple welcome message to verify the service is up and running.')
  public static async test(ctx: BaseContext): Promise<void> {
    ctx.status = 200;
    ctx.body = 'Success';
  }
}
