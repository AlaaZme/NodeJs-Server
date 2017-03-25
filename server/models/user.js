var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
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
UserSchema.methods.toJSON = function () {

    var User = this;
    var UserObject = User.toObject();

    return _.pick(UserObject, ['_id','uname','email'])

};
UserSchema.methods.generateAuthToken = function(){
var User = this;
var access = 'auth';
var token = jwt.sign({_id: User._id.toHexString(),access},'abc123').toString();
User.tokens.push({access,token});

return User.save().then(()=>{
return token;

});
};
UserSchema.statics.findByToken = function (token){
var User = this;
var decoded;

try{
decoded = jwt.verify(token,'abc123');
}catch (e){
  return Promise.reject();
}
return User.findOne({
  _id: decoded._id,
  'tokens.token': token,
  'tokens.access': 'auth'

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

