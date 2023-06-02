const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: String,
  location: String,
  description: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  Date: Date,
  like: String,
  comment: Object,
});
const InstaPost = mongoose.model("InstaPost", PostSchema);
module.exports = InstaPost;
