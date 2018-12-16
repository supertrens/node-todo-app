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

    // db.collection('Todos')
    //   .find()
    //   .toArray()
    //   .then(
    //     docs => {
    //       console.log('Todos');
    //       console.log(JSON.stringify(docs, undefined, 2));
    //     },
    //     (err) => {
    //       if (err) {
    //         return console.log('Unable to insert todo ', err);
    //       }
    //     }
    //   );

    db.collection('Users')
      .find({name: "Peter"})
      .toArray()
      .then(
        docs => {
          console.log('We found ' + docs.length + ' documents');
          console.log(JSON.stringify(docs, undefined, 2));
        },
        err => {
          if (err) {
            return console.log('Unable to insert todo ', err);
          }
        }
      );

    // client.close();
  }
);
