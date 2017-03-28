const path = require('path');

var request = require("request");
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
//app.use(bodyParser.json());

//const publicPath = path.join(__dirname,'../public');
//console.log(publicPath);
//app.set('view engine','ejs');
//0app.use(express.static(publicPath));
//ap11p.use(express.static('./../myapp.html'));



//---------------------------------------------


var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }

});

function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        res.writeHead(200, {
            'content-type': 'text/plain'
            
        });
       // res.write('received the data:\n\n');
     /*   res.end(util.inspect({
            fields: fields
            //files: files
        }));*/


           //  req.body.uname
           //   req.body.email= fields.email,
             //   console.log(fieldsemail),
           //    req.body.password=  fields.password
             //    console.log(fields.password)
    });
}

//server.listen(1185);
console.log("server listening on 1185");



/*request({
  uri: "http://www.cjihrig.com/development/php/hello_form.php",
  method: "POST",
  form: {
    name: "Bob"
  }
}, function(error, response, body) {
  console.log(body);
});
*/



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

  processAllFieldsOfTheForm(req, res);

var User = new user({
    
     uname : req.body.uname,
    email : req.body.email,
    password : req.body.password
    
});
    User.save().then(()=>{
        return User.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(User);
            
    }).catch(    (e)=>{  res.status(400).send(e);}    )
console.log(req.query);
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


/*function displayForm(res) {
  /*  fs.readFile('index.html', function (err, data) {
      /*  res.writeHead(200, {
         'Content-Type': 'application/json',
                'Content-Length': data.length
    
        });
      //  res.write(data.JSON.stringify());


    //    console.log(res.usname);
     
        //res.end();
    });
}*/
/*app.listen(port, () => {
    console.log(`started at ${port}`);
});*/
module.exports = {app};