let {
    addHelpmsg
} = require('../controller/helpmsg.js')
const router = require('koa-router')()
router.prefix('/helpmsg')





//发布信息
router.post('/addHelpmsg', addHelpmsg)

module.exports=router