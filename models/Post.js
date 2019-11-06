const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;
const PostSchema = new Schema({
  author: String,
  body: String,
  title: String,
  image_url: String,
  post_date: Date,
  subheading: String,

});
PostSchema.methods.toUserJSON = () => {
  const UserJSON = {
    user: this.User,
    weight: this.Weight,
    gender: this.Gender,
    height: this.Height,
    age: this.Age,
    Date: this.Date,
    BMI: this.BMI,
    BMR: this.BMR,
    idealWeight: this.IdealWeight,
  };
  return UserJSON;
};
mongoose.model('Post', PostSchema);