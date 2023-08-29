const mongoose = require("mongoose");
const bookSchemaa = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String },
  author: { type: String },
  year: { type: Number },
  rating: { type: Number },
});

const book_model = mongoose.model("books", bookSchemaa);
module.exports = book_model;
