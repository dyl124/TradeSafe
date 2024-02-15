import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { Card } from 'antd';
import './advertising.css';

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache()
});

const GET_ADVERTISING = gql`
  {
    advertisings {
      _id
      title
      photos
    }
  }
`;

const AdvertisingPage = () => {
  const { loading, error, data } = useQuery(GET_ADVERTISING);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="new-advcompanytittle">Advertising Data:</h2>
      <div className="adv-second-container">
        {data.advertisings.map(advertising => (
          <div className="custom-adv-card-wrapper" key={advertising._id}>
            <Card
              hoverable
              style={{
                width: 400,
                gap: 20,
                marginLeft: 20,
                marginRight: 20,
                minHeight: 250,
                overflowWrap: "break-word",
                backgroundColor: '#9c9595', // Example background color
                borderRadius: 8, // Example border radius
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Example box shadow
              }}              cover={<img alt="Recent Work" src={advertising.photos[0]} />}
            >
              <Card.Meta title={advertising.title} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdvertisingPageWithApollo = () => (
  <ApolloProvider client={client}>
    <AdvertisingPage />
  </ApolloProvider>
);

export default AdvertisingPageWithApollo;
