import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { Card } from 'antd';
import './companiesNearMePage.css';



const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

const GET_COMPANIES = gql`
  {
    companies {
      _id
      name
      abn
      mobile
      email
      recentWorkPhotos
    }
  }
`;

const CompaniesPage = () => {
  const { loading, error, data } = useQuery(GET_COMPANIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="-company-container">
      <h2 className="newcompanytittle">Company Data:</h2>

      <div className="new-company-card-container">
        {data.companies.map(company => (
          <div key={company._id} className="zompanyz-card-wrapper">
            <Card
              hoverable
              style={{
                width: 300,
                minHeight: 250,
                gap: 20,
                marginLeft: 20,
                marginRight: 20,
                backgroundColor: '#9c9595', // Example background color
                borderRadius: 8, // Example border radius
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Example box shadow
              }}
              cover={<img alt="Recent Work" src={company.recentWorkPhotos[1]} className="comp-card-style" />}
            >
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
