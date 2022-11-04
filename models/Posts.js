const mongoose = require('mongoose')

const Post = mongoose.model('Post', {
    Title: String,
    SubTitle: String,
    Content: String,
    Date: String,
})

module.exports = Post