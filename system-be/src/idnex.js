const Koa = require('koa')
const app = new Koa();

//开启一个http服务
//接收http请求并作处理处理完响应

app.listen(3000, () => {
    console.log('启动成功');
})