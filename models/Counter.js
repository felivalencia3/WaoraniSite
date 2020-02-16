const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;
const CounterSchema = new Schema({
  _id: Number,
  counter: Number
});
var Counter = mongoose.model('counter', CounterSchema);


