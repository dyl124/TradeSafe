import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from 'antd';
import "./updateAdvertising.css"; // Import your CSS file

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const UPDATE_ADVERTISING = gql`
  mutation UpdateAdvertising(
    $id: ID!
    $photos: [String]!
    $title: String!
    $captions: String!
  ) {
    updateAdvertising(
      id: $id
      photos: $photos
      title: $title
      captions: $captions
    ) {
      _id
      photos
      title
      captions
    }
  }
`;

const UpdateAdvertisingPage = () => {
  const [form] = Form.useForm();
  const [updateAdvertising] = useMutation(UPDATE_ADVERTISING);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await updateAdvertising({
        variables: {
          id: values.id,
          photos: values.photos ? values.photos.split(',') : [],
          title: values.title,
          captions: values.captions,
        },
      });
      form.resetFields();
      setLoading(false);
      // Optionally, you can display a success message or redirect the user
      console.log('Advertising updated successfully');
    } catch (error) {
      console.error('Error updating advertising:', error);
      setLoading(false);
    }
  };

  return (
    <div className="update-advertising-container">
      <h2>Update Advertising</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="advertising-form"
      >
        <Form.Item
          label="Advertising ID"
          name="id"
          rules={[{ required: true, message: 'Please enter the advertising ID' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Photos (comma-separated URLs)"
          name="photos"
          rules={[{ required: true, message: 'Please enter at least one photo URL' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Captions"
          name="captions"
          rules={[{ required: true, message: 'Please enter the captions' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Advertising
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const UpdateAdvertisingPageWithApollo = () => (
  <ApolloProvider client={client}>
    <UpdateAdvertisingPage />
  </ApolloProvider>
);

export default UpdateAdvertisingPageWithApollo;
