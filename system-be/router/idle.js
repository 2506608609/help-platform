let {
    addIdle,
    findAll,
    findOne,
    updateIdle,
    deleteidle,
    findweb



} = require('../controller/idle')

const router = require('koa-router')()


router.prefix('/idle')
//发布闲置
router.post('/add', addIdle)
router.get('/find', findAll)
router.post('/findone', findOne)
router.post('/update', updateIdle)
router.post('/delete', deleteidle)
router.get('/findweb', findweb)


module.exports = router