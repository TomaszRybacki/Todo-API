const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

//let data = {
//  id: 10
//};
//
//let token = jwt.sign(data, '123abc');
//console.log(token);
//
//let decoded = jwt.verify(token, '123abc');
//console.log('decoded:', decoded);

// bcrypt hashing

let password = '123abc!';

bcrypt.genSalt(10, (error, salt) => {
  bcrypt.hash(password, salt, (error, hash) => {
    console.log(hash);
  });
});

let hashedPassword = '$2a$10$lwdm6mVnJ0d4adm9/HIcZuHHnmTERPPbmHmGrp0QHY8NHRAlqI1MO';

bcrypt.compare(password, hashedPassword, (error, result) => {
  console.log(result);
});
