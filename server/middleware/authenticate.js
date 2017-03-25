var {user} = require('./../models/user')

var authenticate = (req,res,next)=>{


var token =req.header('x-auth');
     
     user.findByToken(token).then((User)=>{
         if(!User){
   return Promise.reject();
         }
        req.user = user;
        req.token = token;
     }).catch((e)=>{ 
res.status(401).send();
     });


};
module.exports = {authenticate};