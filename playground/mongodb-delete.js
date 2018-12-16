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

    //deleteMany
    // db.collection('Users')
    //   .deleteMany({ name: 'Peter' })
    //   .then(result => {
    //     console.log(result);
    //   });

    // deleteOne
    // db.collection('Users').deleteOne({name: "peter"}).then(result => {
    //   console.log(result);
    // });

    // findOneAndDelete
    db.collection('Users').findOneAndDelete({location: "Tainan City"}).then(result => {
      console.log(result);
    });
  }
);
