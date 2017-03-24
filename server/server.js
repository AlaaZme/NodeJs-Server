var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {todo}= require('./models/todo');
var {user}= require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
var id = "58d40ea5689466941e03159a";
app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
var Todo = new todo({

    text : req.body.text
});

    Todo.save().then((doc)=>{
res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    }).catch((e)=>{
    if(!todo){

    }
})
});
// GET todos
app.get('/todos', (req,res)=>{
   id = req.params.id;
  if(!ObjectID.isValid(id)){

     return res.status(404).send();
  }
  todo.findById(id).then((todo)=>{
   if(!todo){
  return res.status(404).send();
  }
res.send({todo});
}).catch((e) =>{

     res.status(404).send();
})
});



app.listen(port, () => {
    console.log(`started at ${port}`);
});

todo.findById(id).then((todo)=>{
    if(!todo){
   console.log("wrong username");
    }
else
    console.log("todo by id ",todo);
}).catch((e)=>console.log(e));
module.exports = {app};