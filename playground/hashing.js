const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

//let message = 'I am user number 3';
//let hash = SHA256(message).toString();
//
//console.log(message);
//console.log(hash);
//
//let data = {
//  id: 5
//};
//
//let token = {
//  data,
//  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
//}
//
//// data changed
//
//token.data.id = 5;
//token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//// data check
//
//let resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();
//
//if (resultHash === token.hash) {
//  console.log('Data was not changed');
//} else {
//  console.log('Data was changed. Do not trust!');
//}

// json web token

let data = {
  id: 10
};

let token = jwt.sign(data, '123abc');
console.log(token);

let decoded = jwt.verify(token, '123abc');
console.log('decoded:', decoded);














