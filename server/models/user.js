var mongoose = require('mongoose');

var user = mongoose.model('user',{

name:{type :String,required:true},
pass:{ type: String,required:true},
mail:{type:String}

});
module.exports = {user};
/*var newUser = new user({

    name:'alaZme'
});

var newUserr = new user({
  name:'ala',
  pass:"123",
 mail:"alaazme1@live.com"

});
newUserr.save().then((doc) =>{
    console.log("saved user", doc);
},(e)=>{
    console.log("saved user err doc",e);
})
*/

