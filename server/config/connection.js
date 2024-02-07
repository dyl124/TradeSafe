const mongoose = require('mongoose');

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.opfttz8.mongodb.net/?retryWrites=true&w=majority'
);

module.exports = mongoose.connection;