let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let helpmsgSchema = new Schema({
    id: Number,  //id
    title: String,  //标题
    createTime: String,  //发布时间
    content: String,  //内容
    classify: String,  //分类
    author: String, //发布者
    avatar: {
        type: String,
        default: ''
    },   //发布者头像
    comment: {
        type: Number,
        default: 0
    },  //评论数

});
let helpmsg = mongoose.model('helpmsg', helpmsgSchema);


module.exports = helpmsg;
