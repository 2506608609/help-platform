let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let hnoticeSchema = new Schema({
    title: String,  //标题
    createTime: String,  //发布时间
    content: String,  //内容

});

let Hnotice = mongoose.model('hnotice', hnoticeSchema);


module.exports = Hnotice;
