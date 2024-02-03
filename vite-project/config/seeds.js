import mongoose from 'mongoose';
import Company from '../models/company.js';
import Posting from '../models/posting.js';
import Discrepancy from '../models/discrepancy.js';
import User from '../models/user.js';
import Advertising from '../models/advertising.js';

// Assuming ObjectId is imported from mongoose
const { ObjectId } = mongoose.Types;

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
    recentWorkPhotos: ['https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoenterprises.com.au%2Four-board%2Fmale-placeholder-image%2F&psig=AOvVaw3WK0VRRi2BRT8RroFRCVR9&ust=1707008137593000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDXjID7jYQDFQAAAAAdAAAAABAE', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoenterprises.com.au%2Four-board%2Fmale-placeholder-image%2F&psig=AOvVaw3WK0VRRi2BRT8RroFRCVR9&ust=1707008137593000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDXjID7jYQDFQAAAAAdAAAAABAE'],
  },
  // Add more company seed data as needed
];

const postingSeedData = [
  {
    title: 'Job Posting 1',
    caption: 'Looking for skilled professionals',
    photos: ['https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoenterprises.com.au%2Four-board%2Fmale-placeholder-image%2F&psig=AOvVaw3WK0VRRi2BRT8RroFRCVR9&ust=1707008137593000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDXjID7jYQDFQAAAAAdAAAAABAE', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoenterprises.com.au%2Four-board%2Fmale-placeholder-image%2F&psig=AOvVaw3WK0VRRi2BRT8RroFRCVR9&ust=1707008137593000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDXjID7jYQDFQAAAAAdAAAAABAE'],
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
    photosOfWork: ['https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoenterprises.com.au%2Four-board%2Fmale-placeholder-image%2F&psig=AOvVaw3WK0VRRi2BRT8RroFRCVR9&ust=1707008137593000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDXjID7jYQDFQAAAAAdAAAAABAE', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoenterprises.com.au%2Four-board%2Fmale-placeholder-image%2F&psig=AOvVaw3WK0VRRi2BRT8RroFRCVR9&ust=1707008137593000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDXjID7jYQDFQAAAAAdAAAAABAE'],
    scopeOfWorks: 'Scope of the work',
  },
  // Add more discrepancy seed data as needed
];
const userSeedData = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    password: 'password123',
    userName: 'Alice123',
    postings: [], // Add posting ids here
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@example.com',
    password: 'securepass',
    userName: 'BobSmith',
    postings: [], // Add posting ids here
  },
  {
    firstName: 'Eve',
    lastName: 'Williams',
    email: 'eve.williams@example.com',
    password: 'strongpassword',
    userName: 'EveW',
    postings: [], // Add posting ids here
  },
  // Add more user seed data as needed
];




const advertisingSeedData = [
  {
    photos: ['https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoenterprises.com.au%2Four-board%2Fmale-placeholder-image%2F&psig=AOvVaw3WK0VRRi2BRT8RroFRCVR9&ust=1707008137593000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDXjID7jYQDFQAAAAAdAAAAABAE', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoenterprises.com.au%2Four-board%2Fmale-placeholder-image%2F&psig=AOvVaw3WK0VRRi2BRT8RroFRCVR9&ust=1707008137593000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDXjID7jYQDFQAAAAAdAAAAABAE'],
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
