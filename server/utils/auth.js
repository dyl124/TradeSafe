const jwt = require('jsonwebtoken');

const secret = 'topSecretToken';
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
