const express = require('express');
const Products = require('../models/suggestAProduct');
const Router=express.Router();

Router.get('/getAll',(req,res)=>{
  Products.find({}).then((products)=>{
        res.send(products);
  })
});
Router.post('/addFacebook',(req,res)=>{
    res.send(req.body);
})

module.exports=Router;