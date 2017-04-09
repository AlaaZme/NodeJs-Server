const express = require('express');

const Products = require('../models/suggestAProduct');

const Router=express.Router();





Router.post('/addproduct',(req,res)=>{
  

    const newProduct = new Products(req.body);
    newProduct.save().then((product)=>{
              res.send({success:true});
        console.log('sent');
    }).catch((err)=>{
        res.send({success:false})
        console.log(err);
    })

 
});
Router.get('/getAllProducts',(req,res)=>{
      Products.find({},(err)=>{
          console.log("error");
      }).then((products)=>{
          res.send(products);
      }).catch((err)=>{
          res.send({success:false});
      })
});


module.exports=Router;