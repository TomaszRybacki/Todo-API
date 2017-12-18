let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
  let todo = new Todo({
    text: request.body.text
  });

  todo.save().then((document) => {
    response.send(document);
  }, (error) => {
    response.status(400).send(error);
  });


});




app.listen(3000, () => {
  console.log('Started on port 3000');
});
