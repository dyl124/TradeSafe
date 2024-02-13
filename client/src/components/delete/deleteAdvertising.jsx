import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from 'antd';
import "./deleteAdvertising.css"; // Import your CSS 

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const DELETE_ADVERTISING = gql`
  mutation DeleteAdvertising($advertisingId: ID!) {
    deleteAdvertising(advertisingId: $advertisingId) {
      _id
    }
  }
`;

const DeleteAdvertisingPage = () => {
  const [form] = Form.useForm();
  const [deleteAdvertising] = useMutation(DELETE_ADVERTISING);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
        window.confirm('are you sure you want to delete this advertising? ')

      setLoading(true);
      await deleteAdvertising({
        variables: {
          advertisingId: values.advertisingId,
        },
      });
      form.resetFields();
      setLoading(false);
      // Optionally, you can display a success message or redirect the user
      console.log('Advertising deleted successfully');
    } catch (error) {
      console.error('Error deleting advertising:', error);
      setLoading(false);
    }
  };

  return (
    <div className="delete-advertising-container">
      <h2>Delete Advertising</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="advertising-form"
      >
        <Form.Item
          label="Advertising ID"
          name="advertisingId"
          rules={[{ required: true, message: 'Please enter the advertising ID' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="advertising-form-button">
            Delete Advertising
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const DeleteAdvertisingPageWithApollo = () => (
  <ApolloProvider client={client}>
    <DeleteAdvertisingPage />
  </ApolloProvider>
);

export default DeleteAdvertisingPageWithApollo;
