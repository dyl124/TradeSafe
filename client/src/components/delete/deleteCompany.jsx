import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from 'antd';
import "./deleteCompany.css"; // Import your CSS 

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const DELETE_COMPANY = gql`
  mutation DeleteCompany($companyId: ID!) {
    deleteCompany(id: $companyId) {
      _id
    }
  }
`;

const DeleteCompanyPage = () => {
  const [form] = Form.useForm();
  const [deleteCompany] = useMutation(DELETE_COMPANY);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {      
        window.confirm('are you sure you want to delete this company? ')
      setLoading(true);
      await deleteCompany({
        variables: {
          companyId: values.companyId,
        },
      });
      form.resetFields();
      setLoading(false);
      // Optionally, you can display a success message or redirect the user
      console.log('Company deleted successfully');
    } catch (error) {
      console.error('Error deleting company:', error);
      setLoading(false);
    }
  };

  return (
    <div className="delete-company-container">
      <h2>Delete Company</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="company-form"
      >
        <Form.Item
          label="Company ID"
          name="companyId"
          rules={[{ required: true, message: 'Please enter the company ID' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Delete Company
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const DeleteCompanyPageWithApollo = () => (
  <ApolloProvider client={client}>
    <DeleteCompanyPage />
  </ApolloProvider>
);

export default DeleteCompanyPageWithApollo;
