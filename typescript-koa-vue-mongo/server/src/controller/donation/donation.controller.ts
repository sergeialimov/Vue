import { Context } from 'koa';
import Joi from 'joi';
import j2s from 'joi-to-swagger';

import {
  body,
  description,
  request,
  summary,
  tagsAll,
  responsesAll,
} from 'koa-swagger-decorator';

import DonationModel from '../../db/donations/donation.model';

const currencies = ['USD', 'EUR', 'GBP', 'RUB'];

const validationSchema = Joi.object({
  amount: Joi.number().integer().min(5).required(),
  currency: Joi.string().valid(...currencies).required(),
});

const { swagger } = j2s(validationSchema);

@responsesAll({ 200: { description: 'success' }, 400: { description: 'bad request' } })
@tagsAll(['Donation'])
export default class DonationlController {
  @request('post', '/donate')
  @body(swagger.properties)
  @summary('Donation')
  @description('Controller for handling donation requests')
  public static async donate(ctx: Context): Promise<void> {
    try {
      const { error, value } = validationSchema.validate(ctx.request.body);
      if (error) {
        ctx.status = 400;
        ctx.body = {
          ok: false,
          error: error.message || 'Validation error',
        };
        return;
      }

      const { amount, currency } = value;
      await DonationModel.create({
        amount: +amount,
        currency,
      });
      ctx.status = 200;
      ctx.body = { ok: true };
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        ok: false,
        error: err.message || 'Error during donation saving',
      };
    }
  }
}
