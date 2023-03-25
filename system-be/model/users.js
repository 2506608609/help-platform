let mongoose = require('mongoose')
let schema = new mongoose.Schema({
    username: String,
    admin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        select: false
    },
    personal_intro: String,
    avatar: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        defaule: ''
    },
    description: {
        type: String,
        defaule: ''
    },
    phone: {
        type: String,
        defaule: ''
    },
    email: {
        type: String,
        defaule: ''
    },
    
    
})


let Users = mongoose.model('users', schema)
module.exports = { Users }