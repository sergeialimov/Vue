import { SwaggerRouter } from 'koa-swagger-decorator';
import { TestController, DonationController } from './controller';

const router = new SwaggerRouter();

router.get('/test', TestController.test);

router.post('/donate', DonationController.donate);

// Swagger endpoint
router.swagger({
  title: 'koa-vue-mongo',
  description: 'API REST using NodeJS and KOA framework, typescript. Mongoose for MongoDB',
  version: '1.0.0',
});

router.mapDir(__dirname);

export default router;
