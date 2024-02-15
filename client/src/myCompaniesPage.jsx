import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";
import { Card } from 'antd';
import './companiesNearMePage.css';

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache()
});

const loggedInUserId = localStorage.getItem('userId'); // Retrieve the logged-in user ID from local storage

const GET_COMPANIES = gql`
  query GetCompanies($userId: ID!) {
    companies(userId: $userId) {
      _id
      name
      abn
      mobile
      email
      recentWorkPhotos
      director
    }
  }
`;

const CompaniesPage = () => {
  const { loading, error, data } = useQuery(GET_COMPANIES, {
    variables: { userId: loggedInUserId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="new-container">
      <h2>Company Data:</h2>

      <div className="card-container">
        {data.companies.map(company => (
          <div key={company._id} className="card-wrapper">
            <Card
              hoverable
              style={{
                width: 300,
                gap: 20,
                marginLeft: 20,
                marginRight: 20,
                backgroundColor: '#9c9595', // Example background color
                borderRadius: 8, // Example border radius
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Example box shadow
              }}
            >
              <div className="card-style">
                {company.recentWorkPhotos.map((photo, index) => (
                  <img key={index} alt={`Recent Work ${index + 1}`} src={photo} />
                ))}
              </div>
              <Card.Meta
                title={company.name}
                description={
                  <>
                    <p><strong>ABN:</strong> {company.abn}</p>
                    <p><strong>Mobile:</strong> {company.mobile}</p>
                    <p><strong>Email:</strong> {company.email}</p>
                  </>
                }
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const CompaniesPageWithApollo = () => (
  <ApolloProvider client={client}>
    <CompaniesPage />
  </ApolloProvider>
);

export default CompaniesPageWithApollo;
