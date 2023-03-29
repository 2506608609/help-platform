const {
    login,
    reg,
    verify,
    updatePwd, 
    updatePersonal,
    findAll,
    findOne,
    del

} = require('../controller/users')
const router = require('koa-router')()








router.prefix('/users')



//用户登录
router.post('/login', login)
//用户注册
router.post('/reg', reg)
//验证用户登录
router.post('/verify', verify)
//修改密码
router.post('/update/pwd', updatePwd)


//修改用户个人资料
router.post('/update/personal', updatePersonal)



//查询所有用户
router.get('/find/all', findAll)


//查询单个用户
router.get('/find/one', findOne)

//删除用户
router.post('/del', del)




module.exports = router