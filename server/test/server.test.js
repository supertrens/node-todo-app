const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo'
  }
];

// To clear the test database before each test
beforeEach(done => {
  Todo.deleteMany({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'Test todo text fixed';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todo => {
            expect(todo.length).toBe(1);
            expect(todo[0].text).toBe(text);
            done();
          })
          .catch(e => console.log(e));
      });
  });

  it('should not create todo with an empty object', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({})
          .then(todo => {
            expect(todo.length).toBe(2);
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos:id', () => {
  const id = todos[0]._id.toHexString();

  it('should return a doc', done => {
    request(app)
      .get(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(id);
      })
      .end(done);
  });

  it('should return 404 if todo not found', done => {
    const notExistID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${notExistID}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for invalid ID', done => {
    const invalidID = '123';

    request(app)
      .get(`/todos/${invalidID}`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE  /todos:id', () => {
  const id = todos[0]._id;

  it('should removetodo', done => {
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.findById(id).then(todo => {
          expect(todo).toNotExist();
          done();
        }).catch(e => done(e))
      });
  });

  it('should return 404 if todo not found', done => {
    const id = new ObjectID();
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for invalid id', done => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });
});
