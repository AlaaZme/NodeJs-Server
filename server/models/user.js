var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
var UserSchema = new mongoose.Schema({


uname:{type :String, required:true},

email:{
    type:String,
   required:true,
    trim:true,
   minlength:1,
   unique:true,
  validate : {
        validator : validator.isEmail,
        message : '{VALUE} is not a vaild email'
    }

},
password:{ 
    type: String,
   required :true,
   minlength: 4


},
tokens:[{
    access:{
         type:String,
         required: true
    },
token:{
    type:String,
    required:true
}
}]




});
UserSchema.methods.generateAuthToken = function(){
var User = this;
var access = 'auth';
var token = jwt.sign({_id: User._id.toHexString(),access},'abc123').toString();
User.token.push({access,token});

return User.save().then(()=>{
return token;

});
};
var user = mongoose.model('user',UserSchema);
/*
uname:{type :String, required:true},

email:{
    type:String,
   required:true,
    trim:true,
   minlength:1,
   unique:true,
  validate : {
        validator : validator.isEmail,
        message : '{VALUE} is not a vaild email'
    }

},
password:{ 
    type: String,
   required :true,
   minlength: 4


},
tokens:[{
    access:{
         type:String,
         required: true
    },
token:{
    type:String,
    required:true
}
}]

});*/
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

