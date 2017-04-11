const express = require('express');
const mongoose = require('mongoose');
const Products = require('../models/suggestAProduct');

const Router=express.Router();

Router.get('/getcomments',(req,res)=>{
    
    const id = mongoose.Types.ObjectId(req.query.id);
     Products.findById(id).then((product)=>{
        res.send(product.comments)
     })
    
})

Router.post('/addcomment',(req,res)=>{
      const id = mongoose.Types.ObjectId(req.body.id);
    Products.findById(id).then((product)=>{
        product.comments.push({username:req.body.user,comment:req.body.comment});
        product.save();
    }).then(()=>{
            res.send({Success:true});
    }).catch((err)=>{
      console.log("sorry product not found")  
    });

})

Router.post('/addproduct',(req,res)=>{
  

    const newProduct = new Products(req.body);
    newProduct.save().then((product)=>{
              res.send({success:true,id:product.id});
        console.log('sent');
    }).catch((err)=>{
        res.send({success:false})
        console.log(err);
    })

 
});
Router.post("/likeProduct",(req,res)=>{

    const id = mongoose.Types.ObjectId(req.body._id);
    Products.findById(id).then((product)=>{
        product.update({$inc:{Likes:1}}).then((product)=>{
            res.send({success:true});
        })
          
    }).catch((err)=>{
        res.send({success:false});
    })
  
    
});
Router.get('/getAllProducts',(req,res)=>{
      Products.find({},(err)=>{
          
      }).then((products)=>{
          res.send(products);
      }).catch((err)=>{
          res.send({success:false});
      })
});


module.exports=Router;