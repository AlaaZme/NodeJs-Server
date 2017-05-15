const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const facebookModel = new Schema ({
    name:string,
    message:string,
    imageUrl:string
});

const Facebook=mongoose.model('facebook',facebookModel);
module.exports=Facebook;
