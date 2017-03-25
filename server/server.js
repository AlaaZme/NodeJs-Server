const path = require('path');

require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {todo}= require('./models/todo');
var {user}= require('./models/user');
var {authenticate} = require('./middleware/authenticate');
const _ = require('lodash');
var app = express();
//const port =  3000;
const port =process.env.PORT || 3000;
app.use(bodyParser.json());

const publicPath = path.join(__dirname,'../public');
console.log(publicPath);
//app.set('view engine','ejs');

//app.use(express.static('./../myapp.html'));
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`started at ${port}`);
});

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
 var body = _.pick(req.body,['uname','email','password']);


user.findByCredentials(body.uname,body.email,body.password).then((User)=>{
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
/*app.listen(port, () => {
    console.log(`started at ${port}`);
});*/


module.exports = {app};