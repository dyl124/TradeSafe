import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from 'antd';
import "./deletePosting.css"; // Import your CSS 

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const DELETE_POSTING = gql`
  mutation DeletePosting($postingId: ID!) {
    deletePosting(id: $postingId) {
      _id
    }
  }
`;

const DeletePostingPage = () => {
  const [form] = Form.useForm();
  const [deletePosting] = useMutation(DELETE_POSTING);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      if (window.confirm('Are you sure you want to delete this posting?')) {
        setLoading(true);
        await deletePosting({
          variables: {
            postingId: values.postingId,
          },
        });
        form.resetFields();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="delete-posting-container">
      <h2>Delete Posting</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="posting-form"
      >
        <Form.Item
          label="Posting ID"
          name="postingId"
          rules={[{ required: true, message: 'Please enter the posting ID' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="posting-form-button">
            Delete Posting
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const DeletePostingPageWithApollo = () => (
  <ApolloProvider client={client}>
    <DeletePostingPage />
  </ApolloProvider>
);

export default DeletePostingPageWithApollo;
