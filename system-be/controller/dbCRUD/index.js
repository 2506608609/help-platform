
const add = (model, params, ctx) => {
    return model.create(params).then(res => {
        if (res) {
            ctx.body = {
                code: 200,
                msg: '添加成功',
                data: res
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '添加失败',
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '添加时出现异常',
        }
        //一般需要异常处理
        console.log(err)
    })
}

const update = (model, where, params, ctx) => {
    return model.updateOne(where, params)
        .then(res => {
            ctx.body = { result: res }
        })
        .catch(err => {
            ctx.body = {
                code: 400,
                msg: '修改时出现异常',
            }
            //一般需要异常处理
            console.log(err)
        })
}

const del = (model, where, ctx) => {
    return model.findOneAndDelete(where).then(res => {
        ctx.body = { result: res }
        //该结果需要放在回收栈中，以供其他场景使用（后悔药）
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '删除时出现异常'
        }
        console.log(err)
    })
}


const find = (model, where, ctx) => {
    return model.find(where).then(res => {
        ctx.body = { result: res }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '查询所有时出现异常'
        }
        console.log(err)
    })
}

const findOne = (model, where, ctx) => {
    return model.findOne(where).then(res => {
        ctx.body = { result: res }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '查询时出现异常'
        }
        console.log(err)
    })
}

module.exports = {
    add,
    find,
    findOne,
    update,
    del
}