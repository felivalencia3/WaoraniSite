const mongoose = require("mongoose");
const app = require("express").Router();
const bodyParser = require("body-parser");
const moment = require("moment");
const cookieParser = require("cookie-parser")
app.use(cookieParser())
const Post = mongoose.model("Post");
app.get("send_mail", (req, res) => {
    const {name, phone, email, message} = req.body
});
app.get("", (req, res, next) => {
    Post.find({}).sort("-date").exec((err, post) => {
        res.render("index", {posts: post})
    })
});
app.get("/about", (req, res) => {
    res.render("about")
});
app.get("/contact", (req, res) => {
    res.render("contact")
});
app.get("/post/:post", (req, res) => {
    Post.findOne({"title": req.params.post}, (err, post) => {
        res.render("post", {post, moment})
    })
});
app.post("/upload", (req, res) => {
    const {body, title, image_url, subheading, author,country} = req.body;
    newbody = body.toString().trim()+"<br>Writing from: <h2>"+country.toString()+"</h2>";

    Post.create({body:newbody, title, image_url, subheading, author, date: Date.now()}, function (err, post) {
        if (err) res.status(500).send(error);
        return res.redirect("/")
    });
});
app.get("/admin/new", (req, res) => {
    if (eval(req.cookies.admin)) {
        res.render("postform")
    }
    else {
        res.redirect("/")
    }
    
});
app.post("/admin/login", require("body-parser").urlencoded(), (req,res) => {
    const {uname, psw} = req.body;
    /*
    if (uname == "gpclass" && psw=="12345") {
        res.cookie("admin", true)
        res.redirect("/admin/new")
    }
    else {
        res.redirect("/")
    }
    */
})
module.exports = app;