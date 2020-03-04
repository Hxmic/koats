
import * as Koa from 'koa';
import * as Json from 'koa-json';
import * as KoaBody from 'koa-body';
import * as BodyParser from 'body-parser'
import * as Cors from 'koa2-cors';
import LogUtil from './model/log4';

import config from './config';

// mongoose
import * as mongoose from 'mongoose';

// routes
import login from './controllers/login';

const app = new Koa();


app.use(Json());

app.use(KoaBody({
	multipart: true,
	formidable: {
		maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
	}
}));

// 设置跨域
app.use(Cors({
	origin: function(ctx: any) {
		return '*';
	},
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(async (ctx: any, next: any) => {
	let startDate: any = new Date();
	let ms: number;
	
	try {
		await next();
		let endDate: any = new Date();
		ms = endDate - startDate;

		console.log(`---------START_TIME=>${startDate}------------`)
        console.log(`${ctx.method} ${ctx.host}${ctx.url}`);
        console.log(`---------END_TIME=>${endDate}-----------`)
        //console.timeEnd('ts-koa2');
        LogUtil.logResponse(ctx, ms);//记录响应日志

	} catch (error) {
		let endDate: any = new Date();
		ms = endDate - startDate;
		LogUtil.logError(ctx, error, ms);//记录错误日志
        console.log('request exception');
	}
})


// 设置请求的类型
app.use(async (ctx, next) => {
    ctx.set('Content-Type','application/x-www-form-urlencoded');
})

// 路由访问
app.use(login.routes()).use(login.allowedMethods());


// 连接数据库
// mongoose.connect(config.get('mongo').development.host, 
//     {useNewUrlParser: true, useUnifiedTopology: true}, 
// 	function(err) {
// 		if (err) {
// 			console.log('Connection Error' + err);
// 		} else {
// 			console.log('Connection success');
// 		}
// 	}
// )

app.listen(config.get('port'), () => {
    console.log(`正在监听 http://localhost:${config.get('port')}`);
});

