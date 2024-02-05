import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import CompanyList from './getCompanies'; // Correct the import path

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, location, path }) => {
      alert(`GraphQL error ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: 'http://localhost:3000/graphql' })]); // Correct the GraphQL endpoint

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const CompaniesPage = () => {
  return (
    <ApolloProvider client={client}>
      <CompanyList />
    </ApolloProvider>
  );
};

export default CompaniesPage;
