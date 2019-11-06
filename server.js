const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const path = require("path")
const session = require('express-session');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

const app = express();
mongoose.promise = global.Promise;
process.env.NODE_ENV = 'development';
// Middleware for security headers, logging and gzip compression
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(`${__dirname}/dist`));
// Configure Mongoose
const uristring = process.env.MONGODB_URI
  || 'mongodb://localhost/waorani';

mongoose.connect(uristring, {
  useNewUrlParser: true,
}, (err) => {
  if (err) {
    console.log(`ERROR connecting to: ${uristring}. ${err}`);
  } else {
    console.log(`Succeeded connected to: ${uristring}`);
  }
});

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
}
mongoose.set('debug', true);
// Models and Routes
require("./models/Post")
const Post = mongoose.model("Post");
app.use(express.static("."));
app.get("send_mail",(req,res) =>{
  const {name, phone, email, message} = req.body
})
app.get("", (req,res,next) => {
  Post.find({}, (err, post) => {
    res.render("index", {posts: post})
  })
})
app.get("/about", (req,res) => {
  res.render("about")
})
app.get("/contact", (req,res) => {
  res.render("contact")
})
app.get("/post/:post", (req,res) => {
  Post.findOne({"title": req.params.post}, (err, post) => {
    res.render("post", {post})
  })
})
app.post("/upload", (req,res) => {
  const {body, title, image_url, post_date, subheading, author} = req.body;
  
  Post.create({body,title,image_url,post_date,subheading, author, Date: Date.now}, function (err, post) {
    if (err) return handleError(err);
    return res.redirect("/")
  });
})
app.get("/admin/new", (req,res) => {
  res.render("postform")
})
app.listen((process.env.PORT || 8081), () => console.log('Server running on http://localhost:8081/'));
