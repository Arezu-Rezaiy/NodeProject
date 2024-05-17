import express from "express";
// import {dirname} from "path";
// import { fileURLToPath } from "url";
 import bodyParser from "body-parser";
import multer from "multer";
 import path from "path";



const app= express();
const PORT= 3000;

app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


const storage = multer.diskStorage({
    destination: "./public/images",
    filename: function(req,file, cb){
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage:storage,
    limits: {fieldNameSize: 1000000},
}).single("image");

let datas=[{title:"Balkh Province", body:"an ancient province which is located in north of the country and has lots of historical places", image:"images/balkh.PNG" ,id:1},
{title:"Bamian Province", body:"Bamian is an historical city with lots of historical sightseen like band amir", image:"images/Bamian.PNG", id:2},
{title:"Band Amir", body:"Band Amir is a beautiful place located in Bamian", image:"images/Band.PNG", id:2} ];

app.get("/", (req,res)=>{
   
    res.render("index.ejs",{datas:datas});
})

app.get("/new-post", (req,res)=>{
    res.render("new-post.ejs");
})


app.post("/submit", (req,res)=>{
    upload(req, res, (err)=>{
        
     let id= datas.length;
     let image= req.file ? `/images/${req.file.filename} ` : null;

    datas.unshift({id:id, title: req.body.title, body:req.body.body, image:image});
    console.log(datas);
    res.redirect("/");
    })

})


app.get("/edit-post/:id", (req,res)=>{
    const dataId= parseInt(req.params.id);
    const data= datas.find((data)=> data.id === dataId);
   res.render("edit-post.ejs",{ data:data });
})
app.get("/home", (req,res)=>{
    res.redirect("/");
})

app.post("/edit/:id", (req,res)=>{
        upload(req, res, (err)=>{
        const dataId= parseInt(req.params.id);
        const title = req.body.title;
        const body= req.body.body;
        const image=  req.file ? `/images/${req.file.filename}` : null;
        
        const index= datas.findIndex((data)=>data.id === dataId);
        console.log(index);
            datas[index].title= title;
            datas[index].body= body;
            if(image){
                datas[index].image= image;
            }})
        console.log(datas);
        res.redirect("/");
    
})

app.post("/delete/:id", (req, res)=>{
    const postId=parseInt( req.params.id);  
    console.log(postId);
     datas = datas.filter(data=> data.id !== postId);
     res.redirect("/");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})

