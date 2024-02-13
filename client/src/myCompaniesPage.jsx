import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { Card } from 'antd';
import './myCompaniesPage.css'


const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const GET_USER_COMPANIES = gql`
  query GetUserCompanies {
    user {
      companies {
        _id
        name
        abn
        mobile
        email
        recentWorkPhotos
      }
    }
  }
`;

const MyCompaniesPage = () => {
  const { loading, error, data } = useQuery(GET_USER_COMPANIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userCompanies = data.user.companies;

  return (
    <div>
      <h2>Companies Belonging to the User:</h2>
      
      <div className="card-container" style={{ display: 'flex', gap: '16px' }}>
        {userCompanies.map(company => (
          <div key={company._id} style={{ marginBottom: '16px' }}>
            <Card
              hoverable
              style={{ width: 240 }}
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

const MyCompaniesPageWithApollo = () => (
  <ApolloProvider client={client}>
    <MyCompaniesPage />
  </ApolloProvider>
);

export default MyCompaniesPageWithApollo;
