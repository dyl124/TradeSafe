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
      name: 'ABC Construction',
      abn: '123456789',
      mobile: '1234567890',
      email: 'abc@example.com',
      recentWorkPhotos: [
        'https://www.example.com/photo5.jpg',
        'https://www.example.com/photo6.jpg',      ],
    },
    {
      name: 'XYZ Builders',
      abn: '987654321',
      mobile: '9876543210',
      email: 'xyz@example.com',
      recentWorkPhotos: [
        'https://www.example.com/photo5.jpg',
        'https://www.example.com/photo6.jpg',
      ],
    },
    {
      name: 'EFG Contractors',
      abn: '456789123',
      mobile: '4567891230',
      email: 'efg@example.com',
      recentWorkPhotos: [
        'https://www.example.com/photo5.jpg',
        'https://www.example.com/photo6.jpg',
      ],
    },
    {
      name: 'LMN Renovations',
      abn: '789123456',
      mobile: '7891234560',
      email: 'lmn@example.com',
      recentWorkPhotos: [
        'https://www.example.com/photo7.jpg',
        'https://www.example.com/photo8.jpg',
      ],
    },
    {
      name: 'PQR Builders',
      abn: '321654987',
      mobile: '3216549870',
      email: 'pqr@example.com',
      recentWorkPhotos: [
        'https://www.example.com/photo9.jpg',
        'https://www.example.com/photo10.jpg',
      ],
    },
    // Add more seed data as needed
  ];

const discrepancySeedData = [
  {
    dateOfWorks: '2023-01-15',
    complaints: 'Electrical sockets not properly installed',
    photosOfWork: [
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg'
    ],
    scopeOfWorks: 'Electrical wiring and socket installation',
    company: '65c8113a5efadd871cd81a2e',
    posting: '65c8113a5efadd871cd81a31',
    satisfied: 'No',
  },
  {
    dateOfWorks: '2023-02-20',
    complaints: 'Leaking faucet after plumbing repair',
    photosOfWork: [
      'https://example.com/photo3.jpg',
      'https://example.com/photo4.jpg'
    ],
    scopeOfWorks: 'Plumbing repair',
    company: '65c8113a5efadd871cd81a2e',
    posting: '65c8113a5efadd871cd81a31',
    satisfied: 'No',
  },
  {
    dateOfWorks: '2023-03-10',
    complaints: 'Damaged tiles during bathroom renovation',
    photosOfWork: [
      'https://example.com/photo5.jpg',
      'https://example.com/photo6.jpg'
    ],
    scopeOfWorks: 'Bathroom renovation',
    company: '65c8113a5efadd871cd81a2f',
    posting: '65c8113a5efadd871cd81a31',
    satisfied: 'No',
  },
  {
    dateOfWorks: '2023-03-10',
    complaints: 'Damaged hot water service during bathroom renovation',
    photosOfWork: [
      'https://example.com/photo5.jpg',
      'https://example.com/photo6.jpg'
    ],
    scopeOfWorks: 'Bathroom renovation',
    company: '65c8113a5efadd871cd81a2f',
    posting: '65c8113a5efadd871cd81a31',
    satisfied: 'No',
  },
];

const userSeedData = [
  {
    email: 'user1@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password1',
    companies: [],
    postings: [],
  },
  {
    email: 'user2@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    password: 'password2',
    companies: [],
    postings: [],
  },
  {
    email: 'user3@example.com',
    firstName: 'Alice',
    lastName: 'Johnson',
    password: 'password3',
    companies: [],
    postings: [],
  },
  {
    email: 'user4@example.com',
    firstName: 'Bob',
    lastName: 'Brown',
    password: 'password4',
    companies: [],
    postings: [],
  },
  {
    email: 'user5@example.com',
    firstName: 'Emily',
    lastName: 'Wilson',
    password: 'password5',
    companies: [],
    postings: [],
  },
  {
    email: 'user6@example.com',
    firstName: 'Michael',
    lastName: 'Davis',
    password: 'password6',
    companies: [],
    postings: [],
  },
  {
    email: 'user7@example.com',
    firstName: 'Sophia',
    lastName: 'Martinez',
    password: 'password7',
    companies: [],
    postings: [],
  },
  {
    email: 'user8@example.com',
    firstName: 'William',
    lastName: 'Taylor',
    password: 'password8',
    companies: [],
    postings: [],
  },
  {
    email: 'user9@example.com',
    firstName: 'Olivia',
    lastName: 'Thomas',
    password: 'password9',
    companies: [],
    postings: [],
  },
  {
    email: 'user10@example.com',
    firstName: 'Ethan',
    lastName: 'Anderson',
    password: 'password10',
    companies: [],
    postings: [],
  },
  {
    email: 'dylan.mainmm@hotmail.com',
    firstName: 'Dylan',
    lastName: 'Main',
    password: 'Batman123',
    companies: [],
    postings: [],
  }
];

const postingSeedData = [
  {
    title: 'Electrical Wiring Installation',
    caption: 'Looking for a certified electrician to install wiring in my new house.',
    photos: [
      'https://example.com/electrician1.jpg',
      'https://example.com/electrician2.jpg'
    ],
    priceRange: {
      min: 500,
      max: 1000
    }
  },
  {
    title: 'Plumbing Repair Services',
    caption: 'Need a plumber to fix a leaking pipe in the kitchen.',
    photos: [
      'https://example.com/plumber1.jpg',
      'https://example.com/plumber2.jpg'
    ],
    priceRange: {
      min: 100,
      max: 300
    }
  },
  {
    title: 'Roofing Installation and Repair',
    caption: 'Seeking experienced roofers to install a new roof and repair existing damages.',
    photos: [
      'https://example.com/roofer1.jpg',
      'https://example.com/roofer2.jpg'
    ],
    priceRange: {
      min: 1000,
      max: 2000
    }
  },
  {
    title: 'electrical Installation and Repair',
    caption: 'Seeking experienced electrical to install a new electrics and repair existing damages.',
    photos: [
      'https://example.com/roofer1.jpg',
      'https://example.com/roofer2.jpg'
    ],
    priceRange: {
      min: 2000,
      max: 3000
    }
  },
  {
    title: 'car Installation and Repair',
    caption: 'Seeking experienced car repairers to install a new new car sterio and repair existing damages.',
    photos: [
      'https://example.com/roofer1.jpg',
      'https://example.com/roofer2.jpg'
    ],
    priceRange: {
      min: 500,
      max: 2000
    }
  },
];


const advertisingSeedData = [
  {
    photos: [
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg',
    ],
    title: 'Professional Electrical Services for Your Home',
    captions: 'Experience top-quality electrical services by our certified technicians. Contact us now!',
    company: '65c8113a5efadd871cd81a2f',
  },
  {
    photos: [
      'https://example.com/photo3.jpg',
      'https://example.com/photo4.jpg',
    ],
    title: 'Expert Plumbing Solutions for Your Plumbing Needs',
    captions: 'From repairs to installations, our plumbers have got you covered. Book a service today!',
    company: '65c8113a5efadd871cd81a30',
  },
  {
    photos: [
      'https://example.com/photo5.jpg',
      'https://example.com/photo6.jpg',
    ],
    title: 'Transform Your Roof with Professional Roofing Services',
    captions: 'Protect your home with our expert roofing solutions. Get a free estimate now!',
    company: '65c8113a5efadd871cd81a2d',
  },
  {
    photos: [
      'https://example.com/photo5.jpg',
      'https://example.com/photo6.jpg',
    ],
    title: 'Transform Your bedding with Professional bedding Services',
    captions: 'Protect your home with our expert bedding solutions. Get a free estimate now!',
    company: '65c8113a5efadd871cd81a2d',
  },
  {
    photos: [
      'https://example.com/photo5.jpg',
      'https://example.com/photo6.jpg',
    ],
    title: 'Transform Your electrical with Professional electrical Services',
    captions: 'Protect your home with our expert electrical solutions. Get a free estimate now!',
    company: '65c8113a5efadd871cd81a2d',
  },
];

const seedCompany = async () => {
  try {
    await Company.create(companySeedData);
  } catch (error) {
  }
};

const seedPosting = async () => {
  try {
    await Posting.create(postingSeedData);
  } catch (error) {
  }
};

const seedDiscrepancy = async () => {
  try {
    await Discrepancy.create(discrepancySeedData);
  } catch (error) {
  }
};

const seedUser = async () => {
  try {
    await User.create(userSeedData);
  } catch (error) {
  }
};

const seedAdvertising = async () => {
  try {
    await Advertising.create(advertisingSeedData);
  } catch (error) {
  }
};

// Seed all data
seedCompany();
seedPosting();
seedDiscrepancy();
seedUser();
seedAdvertising();