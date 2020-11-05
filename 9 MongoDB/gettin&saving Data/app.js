const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')
//express app
const app = express();

//DB connection;
const db = 'mongodb+srv://jr_edris:911702@eftekar01.0nnjt.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => app.listen(3000)) //listen for request
    .catch((err) => console.log(err));


//register view engine
app.set("view engine", "ejs");



//static files & middleware
app.use(express.static('public'))
//middleware
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
//add a blog
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'here is my first blog',
        snippet: 'a snippet',
        body: 'a simple body',

    });
    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

//show all blog
app.get('/all-blog', (req, res) => {

    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

//search a blog
app.get('/single-blog', (req, res) => {

    Blog.findById('5f4515ce2e3a282b7455d0d4')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/", (req, res) => {
    const blogs = [{
            title: "Raghib is a good guy",
            snippet: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            body: 'somthing'
        },
        {
            title: "Raghib is a bad guy",
            snippet: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            body: 'somthing'

        },
        {
            title: "Raghib is a hard working guy",
            snippet: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            body: 'somthing'

        },
    ];
    res.render("index", {
        title: "Home",
        blogs
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About"
    });
});

app.get("/blog/create", (req, res) => {
    res.render("create-blog", {
        title: "New Blog"
    });
});

// 404 page
app.use((req, res) => {
    res.status(404).render("404", {
        title: "Page Not Found"
    });
});