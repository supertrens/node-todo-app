require('./../server/config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');

const PORT = process.env.PORT;
const app = express();

// middleware
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1> Welcome Pitrens to your TODO</h1>');
});

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    todo => {
      res.send(todo);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get('/todos', (req, res) => {
  Todo.find({})
    .then(todos => {
      res.send({ todos });
    })
    .catch(err => res.status(400).send(err));
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  }

  Todo.findById(id)
    .then(todo => {
      return todo ? res.send({ todo }) : res.status(404).send({});
    })
    .catch(e => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('not valid ID');
  }

  Todo.findOneAndDelete({ _id: ObjectID(id) })
    .then(todo => {
      todo ? res.send({ todo }) : res.status(404).send({});
    })
    .catch(e => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => res.status(400).send());
});

app.listen(PORT, () => {
  console.log(`The server is listening at ${PORT}`);
});

module.exports = {
  app
};
