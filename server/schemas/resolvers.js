const User = require('../models/user.js');
const Advertising = require('../models/advertising.js');
const Company = require('../models/company.js');
const Discrepancy = require('../models/discrepancy.js');
const Posting = require('../models/posting.js');
const { AuthenticationError } = require('../utils/auth.js');

const resolvers = {
  Query: {
    companies: async () => Company.find(),
    postings: async (parent, { companyId, name }) => {
      const params = {};

      if (companyId) {
        params.company = companyId;
      }

      if (name) {
        params.title = {
          $regex: name,
        };
      }

      return Posting.find(params).populate('company');
    },
    posting: async (parent, { id }) => Posting.findById(id).populate('company'),
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
    discrepancy: async (parent, { id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id).populate({
          path: 'discrepancies.posting',
          populate: 'company',
        });

        return user.discrepancies.id(id);
      }

      throw new AuthenticationError('Not logged in');
    },
    advertisings: async () => Advertising.find(),
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addDiscrepancy: async (parent, { postingId }, context) => {
      if (context.user) {
        const discrepancy = new Discrepancy({ posting: postingId });

        await User.findByIdAndUpdate(context.user.id, {
          $push: { discrepancies: discrepancy },
        });

        return discrepancy;
      }

      throw new AuthenticationError('Not logged in');
    },
    addAdvertising: async (parent, args) => {
      const advertising = await Advertising.create(args);
      return advertising;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },
    updatePosting: async (parent, { id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return Posting.findByIdAndUpdate(
        id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers ; // Named export of the 'resolvers' object
