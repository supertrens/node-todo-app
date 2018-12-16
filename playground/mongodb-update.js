const MongoClient = require('mongodb').MongoClient;

// Connection url
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

// Connect using MongoClient
MongoClient.connect(
  url,
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to mongo db server');
    }
    console.log('Connected to mongo db server');

    const db = client.db(dbName);

    db.collection('Users')
      .findOneAndUpdate(
        { name: 'Mr.Pi' },
        { $inc: { age: 1 }, $set: { name: 'Ernst Pierre' } },
        { returnOriginal: false }
      )
      .then(result => {
        console.log(result);
      });

    client.close();
  }
);
