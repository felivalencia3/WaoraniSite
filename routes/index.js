const mongoose = require("mongoose");
const app = require("express").Router();
const bodyParser = require("body-parser");
const moment = require("moment");
const cookieParser = require("cookie-parser")

app.use(cookieParser())

const Post = mongoose.model("Post");

app.get("send_mail", (req, res) => {
    const {
        name,
        phone,
        email,
        message
    } = req.body
});
app.get("", (req, res, next) => {
    var isAdmin = (req.cookies.admin == 'true');
    Post.find({}).sort("-date").exec((err, post) => {
        res.render("index", {
            posts: post,
            admin: isAdmin
        })
    })
});

app.get("/about", (req, res) => {
    res.render("about")
});

app.get("/post/:post", (req, res) => {
    const postName = decodeURIComponent(req.params.post)
    Post.findOne({
        "title": postName
    }, (err, post) => {
        res.render("post", {
            post,
            moment
        })
    })
});
app.post("/upload", (req, res) => {
    const {
        body,
        title,
        image_url,
        subheading,
        author,
        country
    } = req.body;
    newbody = (body.toString().trim() + "<br><br>Writing from: <h2>" + country.toString() + "</h2>").trim();

    Post.create({
        body: newbody,
        title,
        image_url,
        subheading,
        author,
        date: Date.now()
    }, function (err, post) {
        if (err) res.status(500).send(error);
        return res.redirect("/")
    });
    res.redirect("/")
});
app.use('/admin', require('./admin'));
module.exports = app;