let Helpmsg = require('../model/helpmsg')

//发布求助信息
const addHelpmsg = async ctx => {
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



//查询所有求助信息(分页)
const findAllHelpmsg = async ctx => {
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
    await Helpmsg.find({ author }).count().then(rel => {
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
    await Helpmsg.find({ author }).skip(start).limit(pageSize).then(rel => {
        if (rel) {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                rel,
                totapage,
                page,
                pageSize,


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

//查询一个求助信息  
const findOneHelpmsg = async ctx => {
    let { id } = ctx.query
    await Helpmsg.findOne({ id }).then(rel => {
        if (rel) {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                result: rel
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



//修改互助信息
const updateHelpmsg = async ctx => {
    let helpmsg = ctx.request.body
    await Helpmsg.updateOne({ id: helpmsg.id },

        {
            title: helpmsg.title,
            content: helpmsg.content,
            classify: helpmsg.classify,
        }
    ).then(rel => {
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


//删除互助信息模块接口
const deleteHelpmsg = async ctx => {
    let { id } = ctx.request.body
    await Helpmsg.deleteOne({ id }).then(rel => {
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
    addHelpmsg,
    findAllHelpmsg,
    findOneHelpmsg,
    updateHelpmsg,
    deleteHelpmsg
}