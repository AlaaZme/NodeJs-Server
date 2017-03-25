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
/*var User = new user({

     uname : req.body.uname,
     email : req.body.email,
    password : req.body.password
    
});*/
       var body = _.pick(req.body, ['uname','email','password']);
      var User = new user(body);

    User.save().then((user)=>{
       res.send(User);
    }).catch((e)=>{
   
     res.status(400).send(e);

    })
//});

  /*  User.save().then((doc)=>{
res.send(doc);
    },(e)=>{
        res.status(400).send(e);

    });*/
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
  if(!ObjectID.isValid(id)){

     return res.status(404).send();
  }
user.findById(id).then((user)=>{
    if(!user){
   console.log("wrong username");
    }
else
    console.log("user by id ",user);
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
module.exports = {app};