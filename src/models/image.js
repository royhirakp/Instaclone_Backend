const mongoose= require('mongoose');
const postimage=new mongoose.Schema({
    name:{type:String},
    location: {type: String},
    description: String,
    Date: Date,
    like : Number,
    imagedata:{ data: Buffer, contentType: String }
})

const model = mongoose.model('instaposts',postimage);
module.exports=model;