let { add, find } = require('../controller/talk')
const router = require('./comment')


router.prefix('/talk')



router.post('/add', add)
router.get('/find', find)

module.exports=router
