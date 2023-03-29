let Hnotice = require('../model/hnotice');

//发布公告
const addHnotice = async ctx => {

    let hnotice = ctx.request.body;
    await Hnotice.create(hnotice).then(rel => {

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


//查询所有公告返回content内容

const findallHnotice = async ctx => {
    await Hnotice.find().then(rel => {
        if (rel) {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                rel,
               
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '查询失败'
            }
        }


    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '查询出现了异常捏',
            err
        }
    })
}



//查询所有公告分页查询
const findHnotice = async (ctx) => {
    try {
        const page = parseInt(ctx.query.page) || 1
        const pageSize = 5

        const count = await Hnotice.countDocuments()
        const totalPage = Math.ceil(count / pageSize)
        
        const start = (page - 1) * pageSize
        const content = ctx.query.content
        const hnotice = await Hnotice.find().skip(start).limit(pageSize)
        
        ctx.body = {
            code: 200,
            msg: '查询成功',
            hnotice,
            totalPage,
            page,
            pageSize,
            count,
            content
            
            
            

        }
    } catch (err) {
        ctx.body = {
            code: 500,
            msg: '查询出现了异常捏',
            err,
        }
    }
}


//查询一个公告
const findOneHnotice = async ctx => {
    let { _id } = ctx.request.body


    await Hnotice.findOne({ _id }).then(rel => {
        if (rel) {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                rel
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '查询失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '查询出现了异常捏',
            err
        }
    })
}

//修改公告
const updateHnotice = async ctx => {

    let hnotice = ctx.request.body;
    await Hnotice.updateOne({ _id: hnotice._id }, {

        title: hnotice.title,
        content: hnotice.content,


    }).then(rel => {
        if (rel) {
            ctx.body = {
                code: 200,
                msg: '修改成功',
                rel
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '修改失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '修改出现了异常捏',
            err
        }
    })
}

//删除公告模块接口
const deleteHnotice = async ctx => {
    let { _id } = ctx.request.body
    await Hnotice.deleteOne({ _id }).then(rel => {
        if (rel) {
            ctx.body = {
                code: 200,
                msg: '删除成功',
                rel
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '删除失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '删除出现了异常捏',
            err
        }
    })
}


module.exports = {
    addHnotice,
    findHnotice,
    findOneHnotice,
    updateHnotice,
    deleteHnotice,

}