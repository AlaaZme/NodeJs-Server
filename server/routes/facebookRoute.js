const express = require('express');
const Facebook = require('../models/suggestAProduct');
const Router=express.Router();
const mongoose = require('mongoose');

Router.get('/getAll',(req,res)=>{
  Facebook.find({}).then((facebook)=>{
        res.send(products);
  })
});
Router.post('/addFacebook',(req,res)=>{
    

    res.send(req.body)
    
    
})

module.exports=Router;