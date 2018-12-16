const mongoose = require('mongoose');

// Connection url
const urlLocal = 'mongodb://localhost:27017/TodoApp';
const urlMongoLab = process.env.MONGODB_URI;


mongoose.Promise = global.Promise;
mongoose.connect(urlMongoLab || urlLocal);

module.exports = { mongoose };
