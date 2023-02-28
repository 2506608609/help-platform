const mongoose = require('mongoose');
//1.给哪个数据库的
//哪个集合

//schema
//modal 根据schema生成的一套方法集合，使用这套方法操作集合下的文档


//添加什么文档
//

const UserSchema = new mongoose.Schema({
    nikename: String,
    password: String,
    age: Number,
})
const UserModel = mongoose.model('User', UserSchema);


const connect = () => {

    //连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/UserHelp');

    //当数据库被打开的时候做一些事情

    mongoose.connection.on('open', () => {
        console.log('连接成功');


        const user = new UserModel({
            nikename: 'xiaoming',
            password: '123',
            age: '20',


        })
        user.save()
    })

}


connect();