const mongoose = require('mongoose')

const Users = mongoose.model('users',{
    Username: String,
    Password: String,
    Img: {
        data: Buffer,
        contentType: String,
    }

})

module.exports = Users