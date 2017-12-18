// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  // deleteMany - usuwa wszystkie dokumenty, które spełniają kryteria

  db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    console.log(result);
  });

  // deleteOne - usuwa tylko pierwszy dokument, który spełnia podane kryteria

//  db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
//    console.log(result);
//  });

  // findOneAndDelete

//  db.collection('Todos').findOneAndDelete({text: 'Eat lunch'}).then((result) => {
//    console.log(result);
//  });

  // db.close();
});
