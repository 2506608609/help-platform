let mongoose = require('mongoose')

//聊天室
let schema = mongoose.Schema({
    //
    username: String,
    content: String,
    createTime: String,
    avatar: String,
})

//mongoose.model第一个参数为文档对象名,另一个为该模型所包含的属性
let talk = mongoose.model('talk', schema)

module.exports = talk