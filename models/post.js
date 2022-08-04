const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPost = new Schema({
    title: String,
    detail: String,
    dateCreated: { type: Date, default: Date.now }
});


const Post = mongoose.model('Post', BlogPost);

module.exports = Post;