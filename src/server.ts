
import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import * as Log4js from 'koa-log4';
import login from './controllers/login';

const app = new Koa();
// const logger = Log4js.getLogger('app')

app.use(BodyParser())

app.use(login.routes()).use(login.allowedMethods());

app.listen(3000);

console.log('Server running on port 3000');