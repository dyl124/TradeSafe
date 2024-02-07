var mongoose = require('mongoose');
var Company = require('../models/company.js');
var Posting = require('../models/posting.js');
var Discrepancy = require('../models/discrepancy.js');
var User = require('../models/user.js');
var Advertising = require('../models/advertising.js');

async function cleanDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.opfttz8.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Delete all documents from each collection
    await Company.deleteMany({});
    await Posting.deleteMany({});
    await Discrepancy.deleteMany({});
    await User.deleteMany({});
    await Advertising.deleteMany({});

    console.log('Database cleaned successfully');
  } catch (error) {
    console.error('Error cleaning database:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
}

// Call the cleanDatabase function
cleanDatabase();
