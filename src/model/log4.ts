import * as Log4js from 'log4js';
import LogConfig from '../config/log';

// 加载配置文件
Log4js.configure(LogConfig);

let logUtil: any = {};
//调用预先定义的日志名称
let resLogger: any = Log4js.getLogger('resLogger');
let errorLogger: any = Log4js.getLogger('errorLogger');
let consoleLogger: any = Log4js.getLogger();

/**
 * 错误日志封装
 */
logUtil.logError = (ctx: any, error: any, resTime: number) => {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
}
//格式化错误日志
let formatError = (ctx: any, err: any, resTime: number) => {
    let reqLog: any = formatReqLog(ctx.request, resTime)
    let logText: string = `*************** error log start ***************
              ${reqLog}
              error name:${err.name}
              error message:${err.message}
              error stack:${err.stack}
              *************** error log end ***************`;
    return logText;
}

/**
 * 响应日志封装
 */
logUtil.logResponse = (ctx: any, resTime: number) => {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};
//格式化响应日志
let formatRes = (ctx: any, resTime: number) => {
    let reqLog: any = formatReqLog(ctx.request, resTime);
    let ctxBody: any = JSON.stringify(ctx.body);
    let logText: string = `*************** response log start ***************
                ${reqLog}
                response status:${ctx.status}
                response body:${ctxBody}
                *************** response log end ***************`;
    return logText;
}


/**
 * 普通日志封装
 */
logUtil.logInfo = (info: any) => {
    if (info) {
        consoleLogger.info(formatInfo(info));
    }
};
// 格式化普通日志
let formatInfo = (info: any) => {
    info = JSON.stringify(info);
    var logText: string = `***************info log start ***************
                 info detail:${info}
                 *************** info log end ***************`;
    return logText;
}



let formatReqLog = (req: any, resTime: number) => {
    let reqs: any = req.method === 'GET' ? JSON.stringify(req.query) : JSON.stringify(req.body);
    let logText: string = 
    `request method:${req.method}
    request originalUrl:${req.originalUrl}
    request client ip:${req.ip}
    request query:${reqs}
    response time:${resTime}`;
    
    return logText;
}
export default logUtil;



