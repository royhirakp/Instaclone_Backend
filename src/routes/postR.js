const express = require('express')//
const mongoose = require('mongoose');//
const fs = require('fs')
mongoose.set('strictQuery', false);
const multer  = require('multer')
const cors = require('cors')
// mongoose.connect("mongodb://localhost/InstaClone")  // // DATABASE : USERDB / collection : users
//body parser
const bodyparser = require("body-parser");//
const Blog = require('../models/blog');


const router = express.Router();
router.use(bodyparser.json())
router.use(cors());

//connect to mongodb atlas
async function main() {  
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.3vq7b6q.mongodb.net/InstaClone?retryWrites=true&w=majority');
    console.log('Connected successfully to database!');
    } catch (error) {
        console.log("erorr to conntext database")
    }
}
main()

//storage 
router.use(express.static("public"));
// to upload a file
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'public/image')
    },
    filename:(req,file,cb)=>{
      cb(null, file.originalname)
    }
  })
const uplode = multer({storage: storage})

//******************************************** */ 

router.post("/post", uplode.single('image'),  async (req,res)=>{
    try {
        // console.log(req.body,'<<<<<start of try block')
        const NewBlog = await Blog.create({
            author: req.body.author, 
            location: req.body.location,
            description: req.body.description,
            image: {
                data: fs.readFileSync('public/image/' + req.file.filename),
                contentType: 'image/png'
                    },
            Date: Date.now(),
            like : 0

        })

        res.json({
            NewBlog,
            status:"sucsess"
        })                           
    } catch (e) {
        console.log("error hoccge")
        res.json({
            status:"failed",
            messege: e.messege
        })
    }
})




router.get("/get", async (req, res) => {
    try {
        const data = await Blog.find({});
        const length = data.length;
        res.status(200).json({
            length,
            data
        })
    }
    catch {
        res.status(400).send("an error occured while getting posts")
    }
})  
module.exports = router;