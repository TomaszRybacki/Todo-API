require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');
let { authenticate } = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Todos

app.post('/todos', authenticate, (request, response) => {
  let todo = new Todo({
    text: request.body.text,
    _creator: request.user._id
  });

  todo.save().then((document) => {
    response.send(document);
  }, (error) => {
    response.status(400).send(error);
  });
});

app.get('/todos', authenticate,  (request, response) => {
  Todo.find({
    _creator: request.user._id
  }).then((todos) => {
    response.send({ todos });
  }, (error) => {
    response.status(400).send(error);
  });
});

app.get('/todos/:id', authenticate, (request, response) => {
  let id = request.params.id;

  if (!ObjectID.isValid(id)) {
    return response.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: request.user._id
  }).then((todo) => {
    if (!todo) {
      return response.status(404).send();
    }
    response.send({ todo });
  }).catch(e => response.status(400).send());
});

app.delete('/todos/:id', authenticate, async (request, response) => {
  const id = request.params.id;

  if (!ObjectID.isValid(id)) {
    return response.status(404).send();
  }

  try {
    const todo = await Todo.findOneAndRemove({
    _id: id,
    _creator: request.user._id
  });

    if (!todo) {
      return response.status(404).send();
    }
    response.status(200).send({ todo });
  } catch (error) {
    response.status(400).send();
  }
});

app.patch('/todos/:id', authenticate, (request, response) => {
  let id = request.params.id;
  let body = _.pick(request.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return response.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id: id, _creator: request.user._id }, { $set: body }, { new: true }).then((todo) => {
    if (!todo) {
      return response.status(404).send();
    }

    response.send({ todo });
  }).catch((e) => {
    response.status(400).send();
  });
});

// Users

app.post('/users', async (request, response) => {
  try {
    const body = _.pick(request.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    response.header('x-auth', token).send(user);
  } catch (error) {
    response.status(400).send(error);
  }
});

app.get('/users/me', authenticate, (request, response) => {
  response.send(request.user);
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

app.post('/users/login', async (request, response) => {
  try {
    const body = _.pick(request.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    response.header('x-auth', token).send(user);
  } catch (error) {
    response.status(400).send();
  }
});

app.delete('/users/me/token', authenticate, async (request, response) => {
  try {
    await request.user.removeToken(request.token);
    response.status(200).send();
  } catch (error) {
    response.status(400).send();
  }
});


module.exports = { app };
