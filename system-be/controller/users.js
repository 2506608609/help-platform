let jwt = require('jsonwebtoken')
const crud = require('./dbCRUD')
let { Users } = require('../model/users')


//用户登录接口


const login = async ctx => {
    let { username, password } = ctx.request.body
    await Users.findOne({ username, password }).then(rel => {
        if (rel) {
            let token = jwt.sign({
                username: rel.username,
                avatar: rel.avatar,
                _id: rel._id
            }, 'ok', {
                expiresIn: 3600 * 24 * 7
            })

            ctx.body = {

                code: 200,
                msg: '登陆成功',
                
                token,
                rel
            }
        } else {
            ctx.body = {

                code: 300,
                msg: '用户名或密码错误'

            }
        }
    }).catch(err => {
        ctx.body = {

            code: 500,
            msg: '登陆时发生了异常',
            err

        }
    })

}


//注册接口

const reg = async ctx => {
    let { username, password,createTime } = ctx.request.body
    let isdouble = false
    await Users.findOne({ username, password }).then(rel => {
        if (rel) isdouble = true
    })
    if (isdouble) {
        ctx.body = {
            code: 300,
            msg: '用户名已经存在了'
        }
        return
    }
    await Users.create({ username, password ,createTime}).then(rel => {
        if (rel) {
            ctx.body = {
                rel,
                code: 200,
                msg: '注册成功',
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '注册失败',
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '注册出现异常',
            err
        }
    })
}


//验证用户登录
const verify = async ctx => {
    let token = ctx.header.authorization.replace('Bearer ', '')


    try {
        let result = jwt.verify(token, 'ok')
        await Users.findOne({ _id: result._id }).then(rel => {
            if (rel) {
                ctx.body = {
                    code: 200,
                    msg: '用户认证成功',
                    user: rel
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: '用户认证失败',
                    res: rel
                }
            }
        }).catch(err => {

            ctx.body = {
                code: 500,
                msg: '用户认证失败', err
            }

        })
    }
    catch (err) {
        ctx.body = {
            code: 401,
            msg: '用户认证失败',
            err

        }
    }
}


//修改密码

const updatePwd = async ctx => {
    let { username, password } = ctx.request.body
    await Users.updateOne(
        { username },
        { password }

    ).then(rel => {
        if (rel.modifiedCount) {
            ctx.body = {
                code: 200,
                msg: '密码修改成功咯'

            }
        } else {
            ctx.body = {
                code: 300,
                msg: '密码修改失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '密码修改异常',
            err
        }
    })
}


//修改个人用户信息
const updatePersonal = async ctx => {
    console.log(ctx.request.body)
    let { _id, avatar = '', gender = '', description = '', phone = '', email = '' } = ctx.request.body
    await Users.updateOne(
        { _id },
        {
            avatar,
            gender,
            description,
            phone,
            email,
        }).then(res => {
            //查看res中的参数
            console.log(res)
            if (res.matchedCount > 0) {
                ctx.body = {
                    code: 200,
                    msg: '资料已更新'
                }
            } else {
                ctx.body = {
                    code: 300,
                    msg: '资料更新失败'
                }
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                msg: '资料更新异常',
                err
            }
        })
}

//查询所有用户(分页)
const findAll = async (ctx) => {
    try {
        const page = parseInt(ctx.query.page) || 1
        const pageSize = 5

        const count = await Users.countDocuments()
        const totalPage = Math.ceil(count / pageSize)

        const start = (page - 1) * pageSize

        const users = await Users.find().skip(start).limit(pageSize)

        ctx.body = {
            code: 200,
            msg: '查询成功',
            users,
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

//查询单个用户接口
const findOne = async ctx => {
    let { username } = ctx.query
    await Users.findOne({username}).then(rel => {
        ctx.body = {
            code: 200,
            msg: '查询成功',
            rel,
            
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '查询异常',
            err
        }
    })
}


//删除用户接口
const del = async ctx => {
    let { _id } = ctx.request.body
    await Users.deleteOne({ _id }).then(rel => {
        if (rel.deletedCount) {
            ctx.body = {
                code: 200,
                msg: '注销成功'
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '注销失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '注销异常',
            err
        }
    }
    )


}





module.exports = {
    login,
    reg,
    verify,
    updatePwd,
    updatePersonal,
    findAll,
    findOne,
    del


}