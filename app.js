const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const Post = require('./models/post');

mongoose.connect('mongodb://localhost/cleanblog-test-db');

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    const posts = await (await Post.find({})).reverse();
    res.render('site/index', { posts });
});

app.get('/about', (req, res) => {
    res.render('site/about');
})

app.get('/addPost', (req, res) => {
    res.render('site/add_post');
})

app.post('/new-post', async (req, res) => {
    await Post.create(req.body)
    res.redirect('/');
})

app.get('/posts/:id', async (req, res) => {
    const id = req.params.id;
    const posts = await Post.find({ _id: id });

    res.render('site/post.ejs', { posts })
})

app.listen(process.env.PORT || 3000, _ => {
    console.log("Proje aktif");
})