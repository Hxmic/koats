import {request, summary, query, path, body, tags} from 'koa-swagger-decorator';

export default class UserController {
    @request('get', '/users')
    @summary('Find all users')
    public static async getUsers(ctx: any) {
        ctx.body = {
            data: {},
            msg: '成功',
            code: 1000,
        }
    }
}