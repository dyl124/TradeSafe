const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

// You can use secret in your code as needed
const expiration = '4h';

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.extensions = {
      code: 'UNAUTHENTICATED',
    };
  }
}

function signToken({ email, _id }) {
  const payload = { email, _id };
  const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  return token;
}

module.exports = {
  AuthenticationError,
  signToken,
  getToken: function () {
    // Retrieve token from local storage
    return localStorage.getItem('token');
  },
  removeToken: function () {
    // Remove token from local storage
    localStorage.removeItem('token');
  }
};
