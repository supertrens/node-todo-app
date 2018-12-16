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

    // db.collection('Todos').insertOne(
    //   {
    //     text: 'Walk Thuggy',
    //     completed: false
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log('Unable to inset todo ', err);
    //     }
    //     console.log(JSON.stringify(result.ops));
    //   }
    // );

    db.collection('Users').insertOne(
      {
        name: 'Peter',
        age: 28,
        location: 'Tainan City'
      },
      (err, result) => {
        if (err) {
          return console.log('Unable to insert todo ', err);
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
      }
    );

    client.close();
  }
);
