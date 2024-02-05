import React from 'react';
import { useQuery, gql } from '@apollo/client'; // Import useQuery and gql

const GET_COMPANIES = gql`
  query {
    companies {
      _id
      name
      email
    }
  }
`;

const CompanyList = () => {
  const { loading, error, data } = useQuery(GET_COMPANIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const companies = data.companies;

  return (
    <div>
      <h2>Company List</h2>
      <ul>
        {companies.map(company => (
          <li key={company._id}>
            <strong>{company.name}</strong> - {company.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
