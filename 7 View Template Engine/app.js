const express = require("express");

//express app
const app = express();

//register view engine
app.set("view engine", "ejs");

//listen for request
app.listen(3000);

app.get("/", (req, res) => {
    const blogs = [{
            title: "Raghib is a good guy",
            snippet: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        },
        {
            title: "Raghib is a bad guy",
            snippet: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        },
        {
            title: "Raghib is a hard working guy",
            snippet: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
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