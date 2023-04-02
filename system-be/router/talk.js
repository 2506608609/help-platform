let { add, find } = require('../controller/talk')
const router = require('koa-router')()


router.prefix('/talk')



router.post('/add', add)
router.get('/find', find)

module.exports=router
