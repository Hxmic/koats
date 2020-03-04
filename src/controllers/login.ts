import * as Router from 'koa-router';
import { Rresponse } from '../model/config';
const router = new Router();

router.prefix('/api');

router.get('/login', async(ctx: any, next: any) => {
    let ctxBody: Rresponse = {
        code: 1000,
        data: {},
        msg: 'success',
    }
    ctx.body = ctxBody;
})

export default router;

