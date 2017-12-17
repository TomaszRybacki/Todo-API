// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

//  db.collection('Todos').find({completed: false}).toArray().then((docs) => {
//    console.log('Todos');
//    console.log(JSON.stringify(docs, undefined, 2));
//  }, (error) => {
//    console.log('Unable to fetch todos', error);
//  });

    db.collection('Users').find({
      _id: new ObjectID('5a31aa871ad0dd0c74125821')
    }).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (error) => {
    console.log('Unable to fetch todos', error);
  });



  // db.close();
});
