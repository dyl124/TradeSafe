import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { Card } from 'antd';
import './myAdvertisingPage.css'

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
    <div>
      <h2>Advertising Data:</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {data.user.advertisings.map(advertising => (
          <Card
            key={advertising._id}
            hoverable
            style={{ width: 240 }}
            cover={<img alt="Recent Work" src={advertising.photos[0]} />}
          >
            <Card.Meta title={advertising.title} />
          </Card>
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
