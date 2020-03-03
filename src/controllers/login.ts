import * as Router from 'koa-router';
const router = new Router();

router.prefix('/api');

router.get('/login', async(ctx: any, next: any) => {
    ctx.body = {
        code: 1000,
        data: {
            user: 'niu',
            age: 10
        },
        msg: 'success',
    }
})

export default router;

