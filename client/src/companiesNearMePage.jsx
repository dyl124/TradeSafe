import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { Card, DatePicker, Space } from 'antd';
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache()
});

const GET_COMPANIES = gql`
  {
    companies {
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
    <div>
      <h2>CompanyData:</h2>

      <div className="card-container" style={{ display: 'flex', gap: '16px' }}>
        {data.companies.map(company => (
          <div key={company._id} style={{ marginBottom: '16px'  }}>
            <Card
              hoverable
              style={{ width: 240}}
              cover={<img alt="Recent Work" src={company.recentWorkPhotos} />}
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
