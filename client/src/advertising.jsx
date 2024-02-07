import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { Card } from 'antd';

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
      <h2>Advertising Data:</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {data.advertisings.map(advertising => (
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

const AdvertisingPageWithApollo = () => (
  <ApolloProvider client={client}>
    <AdvertisingPage />
  </ApolloProvider>
);

export default AdvertisingPageWithApollo;
