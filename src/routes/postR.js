const express = require('express')//
const mongoose = require('mongoose');//
// mongoose.connect("mongodb://localhost/InstaClone")  // // DATABASE : USERDB / collection : users
//body parser
const bodyparser = require("body-parser");//
const Blog = require('../models/blog');

const router = express.Router();
router.use(bodyparser.json())

//connect to mongodb atlas
async function main() {  
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.3vq7b6q.mongodb.net/InstaClone?retryWrites=true&w=majority');
    console.log('Connected successfully to server');
}
main()

// router.get("/get", async (req,res)=>{
//     try {
//         console.log('get method try part 1')
//         const post = await Blog.find({});
//         res.json({
//             post:post
//         })
//         console.log('get method try part 2')
//     } catch (e) {
//         console.log('get method catch part ')
//         res.json({
//             status:"failed",
//             messege: e.messege
//         })
//     }
// }) 

//******************

router.get("/get", async (req, res) => {
    try {
        const data = await Blog.find({});
        res.status(200).send(data)
    }
    catch {
        res.status(400).send("an error occured while getting posts")
    }
}) 
//************************************* */ 
router.post("/post", async (req,res)=>{
    try {
        console.log(req.body)
        const {image,author,location,description}= req.body;
        const post = await Blog.create({
            image:image, 
            author: author, 
            location: location,
            description: description  
        })
        res.json({
            status:"sucess",
            post
        })
        // console.log("data come from the fromt end :::test ",post)
    } catch (e) {
        res.json({
            status:"failed",
            messege: e.messege
        })
    }
})
module.exports = router;