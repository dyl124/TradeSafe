const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { default: axios } = require('axios');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const startApolloServer = async () => {
	await server.start();

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
}));
	app.use(
		'/graphql',
		expressMiddleware(server, {
			context: authMiddleware,
		})
	);



const referenceNumber = '5548933';
//const apiUrl = 'https://api.escrow-sandbox.com/2017-09-01/transaction';
const apiUrl = 'https://api.escrow-sandbox.com/2017-09-01/transaction/5548933/payment_methods';

// Set the authentication credentials
const config = {
  auth: {
    username: 'dylan.mainmm@hotmail.com',
    password: '3563_aAkkA0xfERRWFKVdekjUaGqa8U0ROJc2S5GjGFpaefCtM7XFNddW50XnithC0FJw'
  },
  params: {
    page: 1,
    per_page: 10,
    sort_by: 'id',
    sort_direction: 'desc'
  }
};

axios.get(apiUrl, config)
  .then(response => {
    console.log('Transaction data:', response.data);
  })
  .catch(error => {
    console.error('Error fetching transaction data:', error);
  });

	
	


	// if we're in production, serve client/dist as static assets
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../client/dist')));

		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../client/dist/index.html'));
		});
	}


	db.once('open', () => {
		app.listen(PORT, () => {
			console.log('client running on port 3000')
			console.log(`API server running on port ${PORT}!`);
			console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
		});
	});
};

startApolloServer();