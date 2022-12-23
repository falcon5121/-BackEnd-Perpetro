const mongoose = require('mongoose')

// const Post = mongoose.model('Post', {
//     Title: String,
//     SubTitle: String,
//     Content: String,
//     Date: String,
// })

const Post = new mongoose.Schema({
    tittle: {
        type: String,
        required: true
    },
    subTittle: {
        type: String,
    },
    content: 'mixed',
    date: {
        type: Date,
        default: Date.now
    }
})



module.exports = Post