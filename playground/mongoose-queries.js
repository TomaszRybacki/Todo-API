const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

let id = '5a37f940d78843d81d80c2db';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
  if (!todo) {
    console.log('Id not found');
  }
  console.log('Todo by Id', todo);
}).catch((e) => console.log(e));
