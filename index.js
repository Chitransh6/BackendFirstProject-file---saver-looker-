const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,'/public')))

app.set('view engine','ejs');

app.use((req,res,next)=>{
   console.log("get the req")
   next();
})

app.get('/',(req,res)=>{
    fs.readdir(`./files`,function(err,files){
        res.render('index',{files : files});
    })
    
})

app.get('/file/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err, filedata){
        res.render('show',{fileName : req.params.filename,filedata : filedata});
    })
    
})

app.post('/create',function(req,res){
   fs.writeFile(`./files/${req.body.Title.split(' ').join('')}.txt`,req.body.Detail,function(err){
       res.redirect("/");
    })

    
}
)
app.listen(3000,()=>{
    console.log("run in 3000");
})
