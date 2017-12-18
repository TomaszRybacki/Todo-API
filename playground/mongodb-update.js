// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

//  db.collection('Todos').findOneAndUpdate({
//    _id: new ObjectID('5a31a9623f8fb7179c820731')
//  }, {
//    $set: {
//      completed: true
//    }
//  }, {
//    returnOrginal: false
//  }).then((result) => {
//    console.log(result);
//  });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a31aa871ad0dd0c74125821')
  }, {
    $set: {
      name: 'Daniel'
    },
    $inc: {
      age: +1
    }
  }, {
    returnOrginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
