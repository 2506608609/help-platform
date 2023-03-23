let Helpmsg = require('../model/helpmsg.js')

//发布求助信息
const addHelpmsg = async ctx=> {
    let helpmsg = ctx.request.body
    await Helpmsg.create(helpmsg).then(rel => {

        if (rel) {
            ctx.body = {
                code: 200,
                msg: '发布成功',
                rel
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '发布失败'
            }
        }

    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '发布出现了异常捏',
            err

        }
    })
}











module.exports = {
    addHelpmsg
}