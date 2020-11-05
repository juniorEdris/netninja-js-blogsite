const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoute = require('./routes/blog-routes');
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
app.use(blogRoute);

// 404 page
app.use((req, res) => {
    res.status(404).render("404", {
        title: "Page Not Found"
    });
});