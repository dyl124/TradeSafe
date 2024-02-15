import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { Card } from 'antd';
import './myAdvertisingPage.css' // Import the CSS file for styling

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache()
});

const GET_USER_ADVERTISING = gql`
  query GetUserAdvertising {
    user {
      advertisings {
        _id
        title
        photos
      }
    }
  }
`;

const MyAdvertisingPage = () => {
  const { loading, error, data } = useQuery(GET_USER_ADVERTISING);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="new-container">
      <h2>Advertising Data:</h2>
      <div className="card-container"> 
        {data.user.advertisings.map(advertising => (
          <div key={advertising._id} className="card-wrapper"> 
            <Card
              hoverable
              style={{
                width: 100,
                gap: 20,
                marginLeft: 20,
                marginRight: 20,
                backgroundColor: '#7f6f6f', // Example background color
                borderRadius: 8, // Example border radius
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Example box shadow
              }}
              cover={<img alt="Recent Work" src={advertising.photos[0]} className="card-style" />} 
            >
              <Card.Meta title={advertising.title} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const MyAdvertisingPageWithApollo = () => (
  <ApolloProvider client={client}>
    <MyAdvertisingPage />
  </ApolloProvider>
);

export default MyAdvertisingPageWithApollo;
