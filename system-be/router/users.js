const {
    login,
    reg,
    verify,
    updatePwd, 
    updatePersonal

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
router.post('/update/personal', updatePersonal)

//修改用户个人资料











module.exports = router