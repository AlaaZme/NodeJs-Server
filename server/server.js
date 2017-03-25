var env = process.env.NODE_ENV ||'development';
console.log('env ****** ', env);
if(env === 'development'){
process.env.PORT = 3000;
process.env.MONGODB_URI = "mongodb://localhost:27017/users";
}else if(env ==='test' ){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/usersTest";
}

var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {todo}= require('./models/todo');
var {user}= require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());


app.post('/users',(req,res)=>{
var User = new user({

     uname : req.body.uname,
     email : req.body.email,
    password : req.body.password
    
});
    User.save().then(()=>{
        return User.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(User);

    }).catch((e)=>{
            res.status(400).send(e);
    })

});
// GET todos
app.get('/users', (req,res)=>{

  user.find().then((user)=>{
   if(!user){
  return res.status(404).send();
}
res.send({user});
}).catch((e) =>{

     res.status(404).send();
})
});



/*app.get('/users:/name', (req,res)=>{
   var  uname = req.params.uname;
if(!ObjectID.isValid(id)){

     return res.status(404).send();
  }
user.find({}).toArray().then((docs)=>{
   console.log("users");
     console.log( JSON.stringify(docs,undefined,2));//{
 //     console.log("FOUND");
 // }
  //console.log(JSON.stringify(docs,undefined,2).name==);
    },(err)=>{
console.log("unable to fetch user");
    });

    });*/


app.get('/users:/id', (req,res)=>{
    var  id = req.params.id;
 /* if(!ObjectID.isValid(id)){

     return res.status(404).send();
  }*/
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

app.listen(port, () => {
    console.log(`started at ${port}`);
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

app.get('/users/me',(req,res)=>{
   var token =req.header('x-auth');
     
     user.findByToken(token).then((User)=>{
         if(!User){
   return Promise.reject();
         }
             res.send(User);
     }).catch((e)=>{
res.status(401).send();
     });
});
module.exports = {app};