import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { DatePicker, Table, Space } from 'antd';
import { PlusSquareOutlined, MinusSquareOutlined, EditOutlined } from '@ant-design/icons';
import './discrepancies.css';
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache()
});

const GET_DISCREPANCY = gql`
{
  user {
    discrepancy {
      _id
      company {
        name
      }
      complaints
      dateOfSubmission
      dateOfWorks
      scopeOfWorks
      photosOfWork
    }
  }
}
`;

const DiscrepanciesPage = () => {
  const { loading, error, data } = useQuery(GET_DISCREPANCY);

  const columns = [
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: company => <span>{company.name}</span>,
    },
    {
      title: 'Complaints',
      dataIndex: 'complaints',
      key: 'complaints',
    },
    {
      title: 'Date of Submission',
      dataIndex: 'dateOfSubmission',
      key: 'dateOfSubmission',
    },
    {
      title: 'Date of Works',
      dataIndex: 'dateOfWorks',
      key: 'dateOfWorks',
    },
    {
      title: 'Scope of Works',
      dataIndex: 'scopeOfWorks',
      key: 'scopeOfWorks',
    },
    {
      title: 'Photos of Work',
      dataIndex: 'photosOfWork',
      key: 'photosOfWork',
      render: photos => (
        <>
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Photo ${index + 1}`} style={{ maxWidth: "200px", maxHeight: "200px", margin: "5px" }} />
          ))}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <PlusSquareOutlined />
          <MinusSquareOutlined />
          <EditOutlined />
        </Space>
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Discrepancy Data:</h2>
      <DatePicker />
      <Table dataSource={data.user.discrepancy} columns={columns} />
    </div>
  );
};

const DiscrepanciesPageWithApollo = () => (
  <ApolloProvider client={client}>
    <DiscrepanciesPage />
  </ApolloProvider>
);

export default DiscrepanciesPageWithApollo;
