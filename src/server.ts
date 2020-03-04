
import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import * as Log4js from 'koa-log4';
import config from './config';

// mongoose
import * as mongoose from 'mongoose';

// routes
import login from './controllers/login';

const app = new Koa();
// const logger = Log4js.getLogger(app)

app.use(BodyParser())

// 设置请求的类型
app.use(async (ctx, next) => {
    ctx.set('Content-Type','application/x-www-form-urlencoded');
})

// 路由访问
app.use(login.routes()).use(login.allowedMethods());


// console.log(config.get('mongo').development.host);

// 连接数据库
mongoose.connect(config.get('mongo').development.host, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
	function(err) {
		if (err) {
			console.log('Connection Error' + err);
		} else {
			console.log('Connection success');
		}
	}
)

app.listen(config.get('port'), () => {
    console.log('正在监听 http://localhost:3000');
});

