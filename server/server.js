const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1> welcome nigga </h1>');
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
      todo ? res.send({ todo }) : res.status(404).send({});
    })
    .catch(e => res.status(400).send({}));
});

app.listen(PORT, () => {
  console.log(`The server is listening at ${PORT}`);
});

module.exports = {
  app
};
