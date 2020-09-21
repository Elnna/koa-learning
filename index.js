const Koa = require('koa');
const Router =  require('koa-router');
const Cors = require('@koa/cors');
const koaBody = require('koa-body');
const json = require('koa-json');

const app = new Koa();
const router = new Router();
const cors = new Cors();

router.prefix('/api');
router.get('/',ctx =>{
    console.log(ctx);
    console.log(ctx.request);
    ctx.body = 'hello localhost';
});

router.get('/api',ctx =>{
    //get params
    const params = ctx.request.query
    console.log(params);
    // console.log(ctx);
    // console.log(ctx.request);
    console.log(params.name,params.age);
    ctx.body = {
        "name":params.name,
        "age":params.age
    };
})
router.get('/async', async (ctx) =>{
   let result =  await new Promise((resolve) =>{
       setTimeout(function (){
           resolve('Hello world 2s later');
       },3000)
    });
   ctx.body = result;

})
router.post('/post',async(ctx) =>{
    let{ body } =  ctx.request;
    console.log(body);
    console.log(ctx.request);
    ctx.body = {
        ...body
    }
    // console.log(ctx.body);
})
app.use(koaBody())
    .use(Cors())
    .use(json({pretty:false,param:'pretty'}));

app.use(router.routes())
    .use(router.allowedMethods());


//1.request,method, respond
//2.api url => function ,router
//3.ctx,async,


app.listen(3000);
