import * as Path from 'path';
let baseLogPath: string = Path.resolve(__dirname, '../../logs'); // 日志跟目录

// 错误日志处理
let errorPath: string = '/errorPath'; // 错误日志目录，相对于根目录
let errorFileName: string = 'error.log';// 错误日志文件名
let errorLogPath: string = `${baseLogPath}${errorPath}/${errorFileName}`;//完整的错误日志路径

// 响应日志处理
let responsePath: string = '/responsePath';//响应日志目录
let responseFileName: string = 'response.log';//响应日志文件名
let responseLogPath: string = `${baseLogPath}${responsePath}/${responseFileName}`;//完整的响应日志路径

// 操作日志目录
let handlePath: string = '/handlePath';//响应日志目录
let handleFileName: string = 'handle.log';//响应日志文件名
let handleLogPath: string = `${baseLogPath}${handlePath}/${handleFileName}`;//完整的响应日志路径

export default {
    //日志格式等设置
    appenders: {
        "rule-console": { "type": "console" },
        "errorLogger": {
            "type": "dateFile",
            "filename": errorLogPath,
            "pattern": "-yyyy-MM-dd-hh",
            "alwaysIncludePattern": true,
            "encoding": "utf-8",
            "daysToKeep": 30,
            "keepFileExt": true
        },
        "resLogger": {
            "type": "dateFile",
            "filename": responseLogPath,
            "pattern": "-yyyy-MM-dd-hh",
            "alwaysIncludePattern": true,
            "encoding": "utf-8",
            "daysToKeep": 30,
            "keepFileExt": true
        },
    },
    
    //供外部调用的名称和对应设置定义
    categories: {
        "default": { "appenders": ["rule-console"], "level": "all" },
        "resLogger": { "appenders": ["resLogger"], "level": "info" },
        "errorLogger": { "appenders": ["errorLogger"], "level": "error" },
        "http": { "appenders": ["resLogger"], "level": "info" }
    },
    disableClustering: true,
    "baseLogPath": baseLogPath
}