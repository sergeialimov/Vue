import config from 'config';
import makeApp from './app';

const serverConfig: Record<string, unknown> = config.get('server');
const app = makeApp();

app.listen(serverConfig.port, () => {
  console.log(`Server is running on port ${serverConfig.port}`);
});
