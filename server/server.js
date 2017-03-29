const path = require('path');

//var request = require("request");
require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var fs = require('fs');
var {mongoose} = require('./db/mongoose.js');
var {todo}= require('./models/todo');
var {user}= require('./models/user');
var {authenticate} = require('./middleware/authenticate');
var {formidable} = require('formidable');
const _ = require('lodash');

var app = express();
app.use(bodyParser.json());
//const port =  3000;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 3000;

//-----------------------------------------

/*app.post('/', function(req, response){
     res.send('Username: ' + req.body.username);
});

app.get('/', function(req, res) {
    res.send('uname: ' + req.query.value);
    console.log(req.query['unamee']);
});*/
app.post('/users',(req,res)=>{

   console.log("in server register");

  //processAllFieldsOfTheForm(req, res);
var User = new user({
    
     uname : req.body.uname,
    email : req.body.email,
    password : req.body.password
    
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

  User.save().then(()=>{
        return User.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(User);
            
    }).catch(    (e)=>{  res.status(400).send(e);}    )
console.log(req.query);

  /*  User.save().then(()=>{
        return User.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(User);
            
    }).catch(    (e)=>{  res.status(400).send(e);}    )
console.log(req.query);*/
});
// GET todos
app.get('/users', (req,res)=>{
//console.log(req.query);
  user.find().then((user)=>{
   if(!user){
  return res.status(404).send();
}
res.send({user});
}).catch((e) =>{

     res.status(404).send();
})
});


app.get('/hhhh', (req,res)=>{
//processAllFieldsOfTheForm(req, res) ;
});


app.get('/users:/id', (req,res)=>{
    var  id = req.params.id;
  if(!ObjectID.isValid(id)){

     return res.status(404).send();
  }
user.findById(id).then((User)=>{
    if(!User){
   console.log("wrong username");
    }
else{
    res.send(User);
    console.log("user by id ",User);
}
}).catch((e)=>console.log(e));
});


app.delete('/users/:id',(req,res)=>{
var id = req.params.id;
if(!ObjectID.isValid(id)){
    return res.status(404).send();
}
user.findByIdAndRemove(id).then((user)=>{

    if(!user)
      return res.status(404).send();
      res.send(user);
}).catch((e)=>{
       res.status(404).send();
});

});

app.post('/users/login',(req,res)=>{
    //  console.log(req.body.myname);      
 var body = _.pick(req.body,['uname','password']);

 // var body = _.pick(req.body,'uname');
   user.findByCredentials(body.uname,body.email,body.password).then((User)=>{
 // user.findByCredentials(body.uname).then((User)=>{
      return User.generateAuthToken().then((token)=>{
         res.header('x-auth',token).send(User);
      });
    //res.send(User);
}).catch((e)=>{
res.status(400).send();
});
 //res.send(body);
});
app.get('/users/me', authenticate,  (req,res)=>{
    res.send(req.User);
});
app.delete('/users/me/token', authenticate, (req,res)=>{
    req.User.removeToken(req.token).then(()=>{
        res.status(200).send();
    }, ()=>{
        res.status(400).send();
   })
});
app.listen(port, () => {
    console.log(`started at ${port}`);
});

module.exports = {app};