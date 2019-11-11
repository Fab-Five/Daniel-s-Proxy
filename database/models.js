var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/menus', {useNewUrlParser: true})
  .then(()=>console.log("connected to db menus"))
  .catch((err)=>console.log("db menus did not connect"))
// var db = require("./index");

var menuSchema = new mongoose.Schema({
  item_name: String,
  description: String,
  price: Number,
  popular: Boolean,
  special_instruction: Boolean,
  extras: {
    type: [
      {
        name: String,
        price: Number
      }
    ],
    default: undefined
  },
  restaurant_id: Number,
  photo_URL: String
}, {collection: 'menu'});

var menu = mongoose.model("menu", menuSchema);

module.exports = menu;
