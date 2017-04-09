const path = require('path');

//var request = require("request");
require('./config/config');
const suggestRoute=require('./routes/suggestRoute');
const usersRoute=require('./routes/usersRoute');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var fs = require('fs');
var {mongoose} = require('./db/mongoose.js');
var {todo}= require('./models/todo');

var {authenticate} = require('./middleware/authenticate');
var {formidable} = require('formidable');
const _ = require('lodash');

var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 3000;

app.use('/suggest',suggestRoute);

app.use('/users',usersRoute);
app.listen(port, () => {
    console.log(`started at ${port}`);
});


module.exports = {app};