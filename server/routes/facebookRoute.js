const express = require('express');
const Facebook = require('../models/suggestAProduct');
const Router=express.Router();

Router.get('/getAll',(req,res)=>{
  Facebook.find({}).then((facebook)=>{
        res.send(products);
  })
});
Router.post('/addFacebook',(req,res)=>{
    const facebook = new Facebook(req.body);
    facebook.save().then(()=>{
        res.send({success:true});
    })
    
})

module.exports=Router;