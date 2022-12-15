const express = require('express')//
const mongoose = require('mongoose');//
const multer  = require('multer')
const cors = require('cors')
// mongoose.connect("mongodb://localhost/InstaClone")  // // DATABASE : USERDB / collection : users
//body parser
const bodyparser = require("body-parser");//
const Blog = require('../models/blog');
const Image = require('../models/image')


const router = express.Router();
router.use(bodyparser.json())
router.use(cors());
//connect to mongodb atlas
async function main() {  
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.3vq7b6q.mongodb.net/InstaClone?retryWrites=true&w=majority');
    console.log('Connected successfully to server');
}
main()

//storage 
router.use(express.static("public"));
// to upload a file
const Imagestorage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
// upload middleware 
const upload = multer({ storage: Imagestorage }).single('testImage')

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

router.post("/post",   async (req,res)=>{
    try {
        console.log(req.body,'<<<<<start of try block')
        upload(req,res,(err)=>{
            console.log(req.body,'<<<<<<uplode blockk')
            if(err){
                console.log(err)
            }else{
                console.log(req.body,'<<<<<else block ')
                const newImage = new Image({
                    name: req.body.data.name,
                    location: req.body.data.location,
                    description: req.body.data.description,
                    Date: Date.now(),
                    like :parseInt (Math.random()*100),
                    imagedata: {
                        data: req.body.data.image,
                        contentType: 'image/png'
                    }
                   
                })
                console.log(newImage,'<<<<<<<<new image ')
                newImage.save()
                .then(()=>res.send(newImage))
                .catch((e)=>console.log(e))
            }
        })
    } catch (e) {
        console.log("error hoccge")
        res.json({
            status:"failed",
            messege: e.messege
        })
    }
})
module.exports = router;