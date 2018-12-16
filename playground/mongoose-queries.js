const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

const todoId = '5c13bf50a5ee45b3b4be7bc7';
const userId = '5c12060b7bdef962e34558ba';

if (!ObjectID.isValid(todoId) || !ObjectID.isValid(userId)) {
  console.log('Invalid Object ID');
  return;
}

Todo.find({
  _id: todoId
})
  .then(todos => {
    console.log('Todos ==>', todos);
  })
  .catch(e => console.log(e));

Todo.findOne({
  _id: todoId
})
  .then(todo => {
    console.log('Todo ==>', todo);
  })
  .catch(e => console.log(e));

Todo.findById(todoId)
  .then(todo => {
    if (!todo) {
      return console.log('ID not found');
    }
    console.log('Todo by ID ==> ', todo);
  })
  .catch(e => console.log(e));

User.findById(userId)
  .then(user => console.log(user ? user.name : "User doesn't exist"))
  .catch(e => console.log(e));
