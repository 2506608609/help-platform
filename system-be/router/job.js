let {
    addJob,
    findAll,
    findOne,
    updatejob,
    deletejob,
    findweb
} = require('../controller/job')


const router = require('koa-router')()


router.prefix('/job')

router.post('/add', addJob)
router.get('/find', findAll)
router.post('/findone', findOne)
router.post('/update', updatejob)
router.post('/delete', deletejob)
router.get('/findweb', findweb)

module.exports = router