const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

var data = {
 id:10
};


var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token,'123abc');
console.log('decoded',decoded);
/*
var message = "I am user number 1";;

var hash = SHA256(`message: ${message}`);
console.log(`message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {

id:4
};

var token = {
        data,
        hash: SHA256(JSON.stringify(data)+ 'somthing').toString()
}
//token.data.id = 5;
//token.hash =SHA256(JSON.stringify(data)).toString();


var resultHash = SHA256(JSON.stringify(data)+ 'somthing').toString();
if(resultHash ===token.hash)
console.log("not changed");
else
console.log("changed");*/

