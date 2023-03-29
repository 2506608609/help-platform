
let Comment = require('../model/comment')
let Helpmsg = require('../model/helpmsg')


//添加评论
const add = async ctx => {
    let comment = ctx.request.body
    //添加评论状态（在文章中表示评论状态）
    let isComment = false
    //转为同步代码
    await Comment.create(comment).then(rel => {
        if (rel) {
            isComment = true
            ctx.body = {
                code: 200,
                msg: '多谢你的回复，发布成功'
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '发布失败，好像出了点问题'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '评论发布时出现异常',
            err
        }
    })
    // console.log(comment.id)
    if (isComment) {
        //数据库常用的api参数，实现递增
        await Helpmsg.updateOne({ id: comment.id }, { $inc: { comment: 1 } })
    }
}

//id查询评论
const findById = async ctx => {
    let { id } = ctx.query
    await Comment.find({ helpmsgId: id }).then(rel => {
        if (rel && rel.length > 0) {
            ctx.body = {
                code: 200,
                msg: '评论查询成功',
                result: rel
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '评论查询失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 300,
            msg: '查询评论时出现异常',
            err
        }
    })
}
//查询所有评论
const findByAuthor = async ctx => {
    //查询的page和author
    let { page, author } = ctx.query

    //判断页码
    if (!page || isNaN(Number(page))) {
        page = 1
    } else {
        page = Number(page)
    }

    //每页条数
    let pageSize = 10

    //计算总页数
    let count = 0
    await Comment.find({ author }).count().then(rel => {
        count = rel
    })
    let totalPage = 0
    if (count > 0) {
        totalPage = Math.ceil(count / pageSize)
    }

    //判断当前页码的范围
    if (totalPage > 0 && page > totalPage) {
        page = totalPage
    } else if (page < 1) {
        page = 1
    }

    //计算起始位置
    let start = (page - 1) * pageSize

    await Comment.find({ author }).skip(start).limit(pageSize).then(rel => {
        if (rel && rel.length > 0) {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                result: rel,
                page,
                pageSize,
                count
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
            msg: '查询时出现异常',
            err
        }
    })
}


//删除评论
const del = async ctx => {
    let { _id } = ctx.request.body

    await Comment.deleteOne({ _id: _id }).then(rel => {
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
            msg: '删除时出现异常',
            err
        }
    })

}






module.exports = {
    add, findById,
    findByAuthor, del
}
