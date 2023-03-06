const mongoose = require('mongoose');

  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const PostSchema = new Schema({   
    author: String, 
    location: String,
    description: String,
    image: {
          data: Buffer,
          contentType: String
            },
    Date: Date,
    like : Number
  })
  const InstaPost = mongoose.model("InstaPost",PostSchema);
  module.exports = InstaPost


//   const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

//  const RecipiSchma = new Schema({
//     title: String,
//     author: String,
//     image: {
//         data: Buffer,
//         contentType: String
//       },
//     ingredients: Array,
//     directions:  String,
//     user: {type: ObjectId, ref: "User"}
//  })
// const RecipiModel = mongoose.model('Recipis',RecipiSchma)
// module.exports = RecipiModel;