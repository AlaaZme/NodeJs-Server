const express = require('express');
const Facebook = require('../models/facebook');
const Router=express.Router();
const mongoose = require('mongoose');

Router.get('/getAll',(req,res)=>{
  Facebook.find({}).then((facebook)=>{
        res.send({success:true});
  })
});
Router.post('/addFacebook',(req,res)=>{
    for(face of req.body){
const facebook = new Facebook(face);
    facebook.save().then(()=>{
        res.send({success:true});
    })

    }
    
    
})

module.exports=Router;