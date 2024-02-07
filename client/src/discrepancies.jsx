import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { DatePicker } from 'antd';
import { PlusSquareOutlined, MinusSquareOutlined, EditOutlined } from '@ant-design/icons';

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache()
});

const GET_DISCREPANCY = gql`
{
  discrepancy {
    _id  
    
  }
}
`;


const DiscrepanciesPage = () => {
  const { loading, error, data } = useQuery(GET_DISCREPANCY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Discrepancy Data:</h2>
      <PlusSquareOutlined />
      <MinusSquareOutlined />
      <EditOutlined />
      <DatePicker />
      <ul>
        {data.discrepancies.map(discrepancy => (
          <li key={discrepancy._id}>
            <strong>Company:</strong> {discrepancy.company.name}<br />
            <strong>Complaints:</strong> {discrepancy.complaints}<br />
            <strong>Date of Submission:</strong> {discrepancy.dateOfSubmission}<br />
            <strong>Date of Works:</strong> {discrepancy.dateOfWorks}<br />
            <strong>Scope of Works:</strong> {discrepancy.scopeOfWorks}<br />
            <strong>Posting Price Range:</strong> {discrepancy.posting.priceRange.min} - {discrepancy.posting.priceRange.max}<br />
            <strong>Photos of Work:</strong><br />
            {discrepancy.photosOfWork.map((photo, index) => (
              <img key={index} src={photo} alt={`Photo ${index + 1}`} style={{ maxWidth: "200px", maxHeight: "200px", margin: "5px" }} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

const DiscrepanciesPageWithApollo = () => (
  <ApolloProvider client={client}>
    <DiscrepanciesPage />
  </ApolloProvider>
);

export default DiscrepanciesPageWithApollo;
