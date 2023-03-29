let {
    addHnotice,
    findHnotice,
    findOneHnotice,
    updateHnotice,
    deleteHnotice
} = require('../controller/hnotice.js')
const router = require('koa-router')()
router.prefix('/hnotice')




//发布公告
router.post('/addHnotice', addHnotice)

//查询所有公告

router.get('/findHnotice', findHnotice)


//查询一个公告
router.post('/findOneHnotice', findOneHnotice)

//修改公告
router.post('/updateHnotice', updateHnotice)

//删除公告

router.post('/deleteHnotice', deleteHnotice)

module.exports = router

