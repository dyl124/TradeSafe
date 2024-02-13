import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from 'antd';
import "./deleteDiscrepancy.css"; // Import your CSS 

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const DELETE_DISCREPANCY = gql`
  mutation DeleteDiscrepancy($discrepancyId: ID!) {
    deleteDiscrepancy(id: $discrepancyId) {
      _id
    }
  }
`;

const DeleteDiscrepancyPage = () => {
  const [form] = Form.useForm();
  const [deleteDiscrepancy] = useMutation(DELETE_DISCREPANCY);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      if (window.confirm('Are you sure you want to delete this discrepancy?')) {
        setLoading(true);
        await deleteDiscrepancy({
          variables: {
            discrepancyId: values.discrepancyId,
          },
        });
        form.resetFields();
        setLoading(false);
        console.log('Discrepancy deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting discrepancy:', error);
      setLoading(false);
    }
  };

  return (
    <div className="delete-discrepancy-container">
      <h2>Delete Discrepancy</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="discrepancy-form"
      >
        <Form.Item
          label="Discrepancy ID"
          name="discrepancyId"
          rules={[{ required: true, message: 'Please enter the discrepancy ID' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="discrepancy-form-button">
            Delete Discrepancy
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const DeleteDiscrepancyPageWithApollo = () => (
  <ApolloProvider client={client}>
    <DeleteDiscrepancyPage />
  </ApolloProvider>
);

export default DeleteDiscrepancyPageWithApollo;
