const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const views = require('koa-views')
const koajwt = require('koa-jwt')
const serve = require('koa-static');
const app = new koa()
const MongoConnect = require('./db')





//连接数据库
MongoConnect()


const user = require('./router/users')
const upload = require('./router/upload')
const helpmsg = require('./router/helpmsg')
const hnotice = require('./router/hnotice')
const comment = require('./router/comment')
const talk = require('./router/talk')
const idle = require('./router/idle')
const job = require('./router/job')





app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))


app.use(cors())
app.use(serve('public'));
app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

app.use(koajwt({
    secret: 'ok'
}).unless({
    path: [/^\/users\/login/, /^\/users\/reg/, ]//不用通jwt认证

}))




app.use(user.routes(), user.allowedMethods)
app.use(upload.routes(), upload.allowedMethods)
app.use(helpmsg.routes(), helpmsg.allowedMethods)
app.use(hnotice.routes(), hnotice.allowedMethods)
app.use(comment.routes(), comment.allowedMethods)
app.use(talk.routes(), talk.allowedMethods)
app.use(idle.routes(), idle.allowedMethods)
app.use(job.routes(), job.allowedMethods)


app.listen(3000)