const express = require('express');
const _ = require('lodash');
var fs = require('fs');
var {user}= require('../models/user');
var {authenticate} = require('../middleware/authenticate');
const mongoose = require('mongoose');
const Router=express.Router();

Router.post('/',(req,res)=>{

   console.log("in server register");
var tmpUser = new user();
  //processAllFieldsOfTheForm(req, res);
var User = new user({
    
     uname : req.body.uname,
    email : req.body.email,
    fName : req.body.fName,
      lName : req.body.lName,
      PhoneNo: req.body.PhoneNo,
           Gender: req.body.Gender,
              email: req.body.email,
                authen: req.body.authen,
    password : req.body.password
    
});
var temp =  req.body.uname;

user.collection.findOne({uname :temp}, function(err,tmpUser) {
    if(err){
console.log("in IF unable to fetch user");
    }
    else if(!tmpUser){
    console.log("DOES NOT EXIST");
    
  User.save().then(()=>{
        return User.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(User);
            
    }).catch(    (e)=>{  res.status(400).send(e);}    )
console.log(req.query);
    }
    else{
  console.log(tmpUser.uname);
 //   User.invalidate("uname", "username must be unique");
          //  done(new Error("username must be unique"));
    }

   
 // return Promise.reject();
});
/*user.find({'uname':req.body.uname},function(err,user){

    
        if (err) {

            console.log('Signup error');
            return done(err);
        }

        //if user found.
        if (user.length!=0) {
          if(user[0].uname){
            console.log('Username already exists, username: ' + uname);                         
             }                             
             var err = new Error();
            err.status = 310;
            return done(err);

        }
});*/
   /* db.collection('users').find({text:"Ala"}).toArray().then((docs)=>{
   console.log("users");
     console.log( JSON.stringify(docs,undefined,2));//{
 //     console.log("FOUND");
 // }
  //console.log(JSON.stringify(docs,undefined,2).name==);
    },(err)=>{
    });*/




 // var body = _.pick(req.body,'uname');

 // user.findByCredentials(body.uname).then((User)=>{

    //res.send(User);

});
Router.get('/', (req,res)=>{
  user.find().then((user)=>{
   if(!user){
  return res.status(404).send();
}
res.send({user});
}).catch((e) =>{

     res.status(404).send();
})
});




Router.get('/users/:id', (req,res)=>{
    var  id = req.params.id;
  if(!ObjectID.isValid(id)){

     return res.status(404).send();
  }
user.findById(id).then((user)=>{
    if(!user){
   console.log("wrong username");
    }
else{
    res.send(user);
    console.log("user by id ",user);
}
}).catch((e)=>console.log(e));
});


Router.delete('/users/:id',(req,res)=>{
var id = req.params.id;
if(!ObjectID.isValid(id)){
    return res.status(400).send();
}
user.findByIdAndRemove(id).then((User)=>{

    if(!user)
      return res.status(401).send();
      res.send(User);
}).catch((e)=>{
       res.status(402).send();
});

});

Router.post('/login',(req,res)=>{ 
 var body = _.pick(req.body,['uname','password']);

   user.findByCredentials(body.uname,body.password).then((User)=>{

      return User.generateAuthToken().then((token)=>{
         res.header('x-auth',token).send(User);
      });
}).catch((e)=>{
res.status(400).send();
});
});
Router.get('/me', authenticate,  (req,res)=>{
    res.send(req.User);
});
Router.delete('/me/token', authenticate, (req,res)=>{
    req.User.removeToken(req.token).then(()=>{
        res.status(200).send();
    }, ()=>{
        res.status(400).send();
   })
});

Router.post('/update',(req,res)=>{
    
const id = mongoose.Types.ObjectId(req.body.id);
     user.findById(id).then((User)=>{

 res.send(User);
}).catch((e)=>{
res.send({success:"failed"})
   });
});
Router.post('/delete',(req,res)=>{
const id = mongoose.Types.ObjectId(req.body.id);
     user.findByIdAndRemove(id).then((user)=>{

 res.send({success:"true"});
}).catch((e)=>{
res.send({success:"failed"})
   });
});
module.exports=Router;