var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({


uname:{type :String, unique:true, required:true, minlength:1
},
fName:{type :String, minlength:1
},
lName:{type :String, minlength:1
},
authen:{type :String, minlength:1
},
Gender:{type :String, minlength:1
},
PhoneNo:{type :String, unique:true,minlength:1
},
email:{
    type:String,

 //  trim:true,
minlength:5,

/* validate : {
        validator : validator.isEmail,
        message : '{VALUE} is not a vaild email'
    }*/
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

    return _.pick(UserObject, ['_id','uname','fName','lName','PhoneNo','authen','Gender','email','password'])

};
UserSchema.methods.generateAuthToken = function(){
var User = this;
var access = 'auth';
var token = jwt.sign({_id: User._id.toHexString(),access}, process.env.JWT_SECRET).toString();
User.tokens.push({access,token});

return User.save().then(()=>{
return token;

});
};


UserSchema.statics.findByToken = function (token){
var User = this;
var decoded;

try{
decoded = jwt.verify(token, process.env.JWT_SECRET);
}catch (e){
  return Promise.reject();
}
return user.findOne({
  '_id': decoded._id,
  'tokens.token': token,
  'tokens.access': 'auth'

});

};
UserSchema.statics.findByCredentials = function (uname,password){
    var User = this;
    return User.findOne({uname}).then((user)=>{
         if(!user){
             return Promise.reject();
         }
         return new Promise((resolve,reject)=>{
             bcrypt.compare(password,user.password,(err,res)=>{
                if(res){resolve(user);
                }else{
                    reject();
                }
             });

         });
    });
};

UserSchema.pre('save',function (next){
    var User=this;


    var temp = User.uname;
/*user.collection.findOne({uname : "Ala"}, function(err, User) {
    if(err){
console.log("in IF unable to fetch user");
    }
    else if(!User){
    console.log("DOES NOT EXIST");
    }
    else{
  console.log(User.uname);
 //   User.invalidate("uname", "username must be unique");
          //  done(new Error("username must be unique"));
    }

   
 // return Promise.reject();
});*/
   if( User.isModified('password')){
       bcrypt.genSalt(10,(err,salt)=>{
           bcrypt.hash(User.password,salt,(err,hash)=>{
            User.password = hash;
            next();

           });
       });
   }else
   next();
});

UserSchema.methods.removeToken = function(token){
    var User= this;
   return User.update({
  $pull:{
      tokens:{token}
    }
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

