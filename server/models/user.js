const mongoose = require('mongoose');
const validator = require('validator');


var user = mongoose.model('User',{

//uname:{type :String},

email:{
    type:String,
    required:true,
    trim:true,
    minlength:1,
    unique:true,
    validator : {
        validator : validator.isEmail,
        message : '{VALUE} is not a vaild email'
    }

},
password:{ 
    type: String,
    required :true,
    minlength: 4


},
/*tokens:[{
    access:{
         type:String,
         required: true
    },
token:{
    type:String,
    required:true
}
}]*/

});
module.exports = {user};
/*var newUser = new user({

    name:'alaZme'
});

var newUserr = new user({
  name:'ala',
  pass:"123",
 mail:"alaazme1@live.com"

});
newUserr.save().then((doc) =>{
    console.log("saved user", doc);
},(e)=>{
    console.log("saved user err doc",e);
})
*/

