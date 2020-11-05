const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const {
    result
} = require("lodash");
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
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
//middleware
app.use(morgan('dev'));



//routes
app.get("/", (req, res) => {
    res.redirect('/blogs');
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About"
    });
});

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({
            createdAt: -1
        })
        .then((result) => {
            res.render('index', {
                title: 'All Blogs',
                blogs: result
            });

        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/blog/create", (req, res) => {
    res.render("create-blog", {
        title: "New Blog"
    });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', {
                blog: result,
                title: "Blog Details"
            });
        })
        .catch((err) => {
            console.log(err);
        });

});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({
                redirect: '/blogs'
            })
        })
        .catch((err) => {
            console.log(err);
        });
});


// 404 page
app.use((req, res) => {
    res.status(404).render("404", {
        title: "Page Not Found"
    });
});