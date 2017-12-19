const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

//  remove all todos

//Todo.remove({}).then((result) => {
//  console.log(result);
//});
//
//// remove one todo and return deleted object
//
//Todo.findOneAndRemove({-id: '5a37f940d78843d81d80c2dc'}).then((todo) => {
//  console.log(todo);
//});
//
//// remove one todo by ID and return deleted object
//
//Todo.findByIdAndRemove('5a37f940d78843d81d80c2dc').then((todo) => {
//  console.log(todo);
//});

