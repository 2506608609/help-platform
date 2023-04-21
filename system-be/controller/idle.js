let Idle = require('../model/idle')

//发布闲置信息
const addIdle = async ctx => {
    let idle = ctx.request.body
    await Idle.create(idle).then(rel => {

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
//查询所有闲置信息(分页)//发布者查询

const findAll = async ctx => {
    let { page, author } = ctx.query
    //判断页码
    if (!page || isNaN(Number(page))) {
        page = 1
    } else {
        page = Number(page)
    }
    //每页显示的条数
    let pageSize = 5

    //计算总页数
    let count = 0
    await Idle.find({ author }).count().then(rel => {
        count = rel

    })
    let totapage = 0
    if (count > 0) {
        totapage = Math.ceil(count / pageSize)
    }


    //判断当前页码范围
    if (totapage > 0 && page > totapage) {
        page = totapage
    } else if (page < 1) {
        page = 1
    }

    //启始位置计算
    let start = (page - 1) * pageSize

    //分段查询函数/
    await Idle.find({ author }).skip(start).limit(pageSize).then(rel => {
        if (rel) {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                rel,
                totapage,
                page,
                pageSize,
                count,
                author,


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





//查询一个闲置信息根据_id
const findOne = async ctx => {
    let { _id } = ctx.request.body
    await Idle.findOne({ _id }).then(rel => {
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

//修改闲置信息
const updateIdle = async ctx => {
    let idle = ctx.request.body
    await Idle.updateOne({ _id: idle._id }, {
        title: idle.title,
        content: idle.content,
        classify: idle.classify,
        price: idle.price,
        state: idle.state,
        details: idle.details,



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

//删除闲置信息
const deleteidle = async ctx => {
    let { _id } = ctx.request.body
    await Idle.deleteOne({ _id }).then(rel => {
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


//web端使用渲染
const findweb = async ctx => {
    try {
        const page = parseInt(ctx.query.page) || 1
        const pageSize = 5

        const count = await Idle.countDocuments()
        const totalPage = Math.ceil(count / pageSize)

        const start = (page - 1) * pageSize

        const idle = await Idle.find().skip(start).limit(pageSize)

        ctx.body = {
            code: 200,
            msg: '查询成功',
            idle,
            totalPage,
            page,
            pageSize,
            count,
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            msg: '查询出现了异常捏',
            err,
        }
    }
}


module.exports = {
    addIdle,
    findAll,
    findOne,
    updateIdle,
    deleteidle,
    findweb,
}