const mongoose = require('mongoose');

  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const PostSchema = new Schema({   
    image:String, 
    author: String, 
    location: String,
    description: String   
  })
  const InstaPost = mongoose.model("InstaPost",PostSchema);
  module.exports = InstaPost