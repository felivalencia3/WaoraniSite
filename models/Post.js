const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;
const PostSchema = new Schema({
  author: String,
  body: String,
  title: String,
  image_url: String,
  date: Date,
  subheading: String,

});
mongoose.model('Post', PostSchema);