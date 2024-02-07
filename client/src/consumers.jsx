import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { DatePicker} from 'antd';
import {PlusSquareOutlined, MinusSquareOutlined, EditOutlined } from '@ant-design/icons'

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache()
});

const GET_CONSUMERS = gql`
  {
    consumers {
      _id  
      name
      abn
      mobile
      email
      recentWorkPhotos
    }
  }
`;

const ConsumersPage = () => {
  const { loading, error, data } = useQuery(GET_consumers);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>consumers Data:</h2>
      <PlusSquareOutlined />
      <MinusSquareOutlined />
      <EditOutlined />
      <DatePicker />
      <ul>
        {data.consumers.map(consumers => (
          <li key={consumers.id}>
            <strong>Name:</strong> {consumers.name}, <strong>ABN:</strong> {consumers.abn} 
            <strong>Mobile:</strong> {consumers.mobile}, <strong>ABN:</strong> {consumers.email}
            <strong>Recent Photos: </strong> 
            <img src={consumers.recentWorkPhotos} alt="Recent Work Photo" />
          </li>
        ))}
      </ul>
    </div>
  );
};

const ConsumersPageWithApollo = () => (
  <ApolloProvider client={client}>
    <ConsumersPage />
  </ApolloProvider>
);

export default ConsumersPageWithApollo;
