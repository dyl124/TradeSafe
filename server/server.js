const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const cors = require('cors');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const express = require('express');
const app = express();
require('dotenv').config();


// You can use serverPort in your code as needed
const bodyParser = require('body-parser');

// Enable CORS middleware
app.use(cors());
// Use body-parser middleware before Apollo Server middleware
app.use(bodyParser.json());

// Retrieve user ID from local storage
const getUserFromLocalStorage = () => {
  return localStorage.getItem('userId');
};

const server = new ApolloServer({
  typeDefs,
  resolvers, 
  context: ({ req }) => {
    const userId = getUserFromLocalStorage();
    return { userId };
  }
});

// Then, apply the ApolloServer instance to your Express app
const startApolloServer = async () => {
  await server.start();

  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server));

  // If we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(3001, () => {
    });
  });
};

startApolloServer();
