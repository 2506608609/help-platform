let {
    addHnotice,
    findHnotice,
    updateHnotice,
    deleteHnotice
} = require('../controller/hnotice.js')
const router = require('koa-router')()
router.prefix('/hnotice')




//发布公告
router.post('/addHnotice', addHnotice)

//查询所有公告

router.get('/findHnotice', findHnotice)

//修改公告
router.post('/updateHnotice', updateHnotice)

//删除公告

router.post('/deleteHnotice', deleteHnotice)

module.exports = router

