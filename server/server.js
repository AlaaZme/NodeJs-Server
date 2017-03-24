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

    name : req.body.name,
    pass : req.body.pass,
       mail : req.body.mail
});

    User.save().then((doc)=>{
res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    }).catch((e)=>{
    if(!user){

    }
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


app.get('/users:/name', (req,res)=>{
  /*  var  id = req.params.id;
  if(!ObjectID.isValid(id)){

     return res.status(404).send();
  }*/
user.find({name:"ala"}).toArray().then((docs)=>{
   console.log("users");
     console.log( JSON.stringify(docs,undefined,2));//{
 //     console.log("FOUND");
 // }
  //console.log(JSON.stringify(docs,undefined,2).name==);
    },(err)=>{
console.log("unable to fetch user");
    });

    });


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