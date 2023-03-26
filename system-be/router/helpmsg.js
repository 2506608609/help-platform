let {
    addHelpmsg,
    findAllHelpmsg,
    findOneHelpmsg,
    updateHelpmsg,
    deleteHelpmsg,
    findAllHelpmsgAdmin

} = require('../controller/helpmsg.js')
const router = require('koa-router')()
router.prefix('/helpmsg')





//发布信息
router.post('/addHelpmsg', addHelpmsg)


//查询所有信息
router.post('/findAllHelpmsg', findAllHelpmsg)
router.get('/findAllHelpmsg', findAllHelpmsg)
//page为页数(显示页数),请求参数page-1为当前页数



//查询单个信息  通过id
router.post('/findOneHelpmsg', findOneHelpmsg)
router.get('/findOneHelpmsg', findOneHelpmsg)

//修改信息
router.post('/updateHelpmsg', updateHelpmsg)

//删除信息
router.post('/deleteHelpmsg', deleteHelpmsg)




//管理员查询所有信息
router.get('/findAllHelpmsg/admin',findAllHelpmsgAdmin)
module.exports=router