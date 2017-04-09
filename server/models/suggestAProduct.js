const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    imageUrl:{type:String,required:true}
});

const Products=mongoose.model('products',productSchema);

module.exports=Products;