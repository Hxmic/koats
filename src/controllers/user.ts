import {request, summary, query, path, body, tags, responsesAll} from 'koa-swagger-decorator';

import {ResponseInfo} from '../interface/index';

@responsesAll({ 200: { description: 'success'}})
export default class UserController {
    @request('get', '/users')
    @summary('Find all users')
    public static async getUsers(ctx: any) {
        let bodyInfo: ResponseInfo = {
            data: {},
            msg: '成功',
            code: 1000,
        }
    }
}