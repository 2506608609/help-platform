let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let idleSchema = new Schema({
    id: Number,  //id
    title: String,  //标题
    createTime: String,  //发布时间
    content: String,  //内容
    classify: String,  //分类/闲置,求购
    author: String, //发布者
    details: String,  //详情
    avatar: {
        type: String,
        default: ''
    },   //发布者头像
    state: {
        type: String,
        default: '未售出'
    }, //是否已经被购买
    price: String,


    //价格

});
let idle = mongoose.model('idle', idleSchema);


module.exports = idle;
