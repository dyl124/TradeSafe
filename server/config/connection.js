const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0.opfttz8.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // Add this line to prevent deprecation warning for `ensureIndex`
  useFindAndModify: false, // Add this line to prevent deprecation warning for `findOneAndUpdate`
});

module.exports = mongoose.connection;
