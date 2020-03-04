import * as nconf from 'nconf'; //  对node.js中 文件、环境变量、命令行参数以及原子对象整合 提供分层配置
import * as path from 'path';

const obj:any = {};

if(!obj.config){
    obj.config = nconf.argv().env().file({file: 'config.json'});
}
let config = obj.config;
config.set('root', path.join(__dirname, '../'));
config.set('env', process.env.NODE_ENV);

export default config;