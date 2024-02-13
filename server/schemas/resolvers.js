// resolvers.js

const { signToken, AuthenticationError } = require('../utils/auth');
const Company = require('../models/company');
const Posting = require('../models/posting');
const Advertising = require('../models/advertising');
const User = require('../models/user');
const Discrepancy = require('../models/discrepancy');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id).populate({
          path: 'discrepancies.posting',
          populate: 'company',
        });

        user.discrepancies.sort((a, b) => b.dateOfSubmission - a.dateOfSubmission);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    

    companies: async () => {
      return Company.find();
    },
    postings: async () => {
      return Posting.find();
    },
    advertisings: async () => {
      return Advertising.find();
    },
    discrepancies: async () => {
      return Discrepancy.find();
    },
  
  },
  Mutation: {
    // User mutations remain unchanged

    // Company mutations
    addCompany: async (parent, args) => {
      return Company.create(args);
    },
    updateCompany: async (parent, { id, ...args }) => {
      return Company.findByIdAndUpdate(id, args, { new: true });
    },
    deleteCompany: async (parent, { id }) => {
      return Company.findByIdAndDelete(id);
    },

    addUser: async (parent, { username, email, password }) => {
      // First we create the user
      const user = await User.create({ username, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },

      updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }
    },
 
      login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError
      }
      const token = signToken(user);
      return { token, user };
    },
    addDiscrepancy: async (parent, args) => {
      return Discrepancy.create(args);
    },
    updateDiscrepancy: async (parent, { id, ...args }) => {
      return Discrepancy.findByIdAndUpdate(id, args, { new: true });
    },
    deleteDiscrepancy: async (parent, { id }) => {
      return Discrepancy.findByIdAndDelete(id);
    },


    // Posting mutations
    addPosting: async (parent, args) => {
      return Posting.create(args);
    },
    updatePosting: async (parent, { id, ...args }) => {
      return Posting.findByIdAndUpdate(id, args, { new: true });
    },
    deletePosting: async (parent, { id }) => {
      return Posting.findByIdAndDelete(id);
    },

    // Advertising mutations
    addAdvertising: async (parent, args) => {
      return Advertising.create(args);
    },
    updateAdvertising: async (parent, { id, ...args }) => {
      return Advertising.findByIdAndUpdate(id, args, { new: true });
    },
    deleteAdvertising: async (parent, { id }) => {
      return Advertising.findByIdAndDelete(id);
    },
  }
  }

module.exports = resolvers;
