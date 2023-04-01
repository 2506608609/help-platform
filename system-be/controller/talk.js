let Talk = require('../model/talk')




const add = async ctx => {
    let talk=ctx.request.body
    await Talk.create(talk).then(rel => {
        if (rel) {
            

            ctx.body = {
                code: 200,
                msg:'发送成功',
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '发送失败',
            }
        }
    }).catch(err=>{
        ctx.body = {
            code: 500,
            msg: '添加异常',
            err
        }
    })
}




//查询talk

const find = async ctx => {
    await Talk.find().then(rel => {
        if (rel) {
            ctx.body = {
                rel,
                code: 200,
                msg:'查询成功'
                
            }
        }
    })
}



module.exports = {
    add,
    find
}
//

