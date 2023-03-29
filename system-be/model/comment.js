
let mongoose = require('mongoose')

//评论文档对象
let schema = mongoose.Schema({
	//
	username: String,
	author: String,
	helpmsgTitle: String,
	helpmsgId: Number,
	content: String,
	createTime: String,
	avatar: String,



})

//mongoose.model第一个参数为文档对象名,另一个为该模型所包含的属性
let Comment = mongoose.model('comments', schema)

module.exports = Comment