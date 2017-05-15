const express = require('express');
const Router=express.Router();

Router.get('/getAll',(req,res)=>{
    res.send({success:true})
});