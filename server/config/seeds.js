var mongoose = require('mongoose');
var Company = require('../models/company.js');
var Posting = require('../models/posting.js');
var Discrepancy = require('../models/discrepancy.js');
var User = require('../models/user.js');
var Advertising = require('../models/advertising.js');

// Extracting ObjectId from mongoose.Types
var ObjectId = mongoose.Types.ObjectId;


mongoose.connect('mongodb+srv://admin:admin@cluster0.opfttz8.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const companySeedData = [
  {
    name: 'Company 1',
    abn: '123456789',
    mobile: '123-456-7890',
    email: 'company1@example.com',
    username: 'company1user',
    password: 'password123',
    recentWorkPhotos: ['https://northpointrp.com/wp-content/uploads/2019/01/Headshot-Placeholder-1.jpg'],
  },
  {
    name: 'Company 2',
    abn: '987654321',
    mobile: '987-654-3210',
    email: 'company2@example.com',
    username: 'company2user',
    password: 'securepass456',
    recentWorkPhotos: [
      'https://northpointrp.com/wp-content/uploads/2019/01/Headshot-Placeholder-1.jpg',
    ],
  },
  {
    name: 'Company 3',
    abn: '456789012',
    mobile: '456-789-0123',
    email: 'company3@example.com',
    username: 'company3user',
    password: 'strongpassword789',
    recentWorkPhotos: [
      'https://northpointrp.com/wp-content/uploads/2019/01/Headshot-Placeholder-1.jpg',
    ],
  },
  {
    name: 'Company 4',
    abn: '789012345',
    mobile: '789-012-3456',
    email: 'company4@example.com',
    username: 'company4user',
    password: 'mypassword2022',
    recentWorkPhotos: [
      'https://northpointrp.com/wp-content/uploads/2019/01/Headshot-Placeholder-1.jpg',
    ],
  }
  
  // Add more company seed data as needed
];

const postingSeedData = [
  {
    title: 'Job Posting 1',
    caption: 'Looking for skilled professionals',
    photos: ['https://northpointrp.com/wp-content/uploads/2019/01/Headshot-Placeholder-1.jpg'],
    priceRange: {
      min: 1000,
      max: 2000,
    },
  },
  // Add more posting seed data as needed
];

const discrepancySeedData = [
  {
    dateOfWorks: '2022-01-01',
    complaints: 'Issues with the work',
    photosOfWork: ['https://northpointrp.com/wp-content/uploads/2019/01/Headshot-Placeholder-1.jpg'],
    scopeOfWorks: 'Scope of the work',
  },
  // Add more discrepancy seed data as needed
];
const userSeedData = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'aliceee.johnson@example.com',
    password: 'password123',
    userName: 'Alice123',
    postings: [], // Add posting ids here
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.sssmith@example.com',
    password: 'securepass',
    userName: 'BobSmith',
    postings: [], // Add posting ids here
  },
  {
    firstName: 'Eve',
    lastName: 'Williams',
    email: 'eveee.williams@example.com',
    password: 'strongpassword',
    userName: 'EveW',
    postings: [], // Add posting ids here
  },
  // Add more user seed data as needed
];




const advertisingSeedData = [
  {
    photos: ['https://northpointrp.com/wp-content/uploads/2019/01/Headshot-Placeholder-1.jpg'],
    title: 'Advertising Title',
    captions: 'Some captions here',
  },
  // Other Advertising entries...
];

const seedCompany = async () => {
  try {
    await Company.create(companySeedData);
    console.log('Companies seeded successfully.');
  } catch (error) {
    console.error('Error seeding companies:', error);
  }
};

const seedPosting = async () => {
  try {
    await Posting.create(postingSeedData);
    console.log('Postings seeded successfully.');
  } catch (error) {
    console.error('Error seeding postings:', error);
  }
};

const seedDiscrepancy = async () => {
  try {
    await Discrepancy.create(discrepancySeedData);
    console.log('Discrepancies seeded successfully.');
  } catch (error) {
    console.error('Error seeding discrepancies:', error);
  }
};

const seedUser = async () => {
  try {
    await User.create(userSeedData);
    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

const seedAdvertising = async () => {
  try {
    await Advertising.create(advertisingSeedData);
    console.log('Advertisings seeded successfully.');
  } catch (error) {
    console.error('Error seeding advertisings:', error);
  }
};

// Seed all data
seedCompany();
seedPosting();
seedDiscrepancy();
seedUser();
seedAdvertising();
