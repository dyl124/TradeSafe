import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from 'antd';
import "./addAdvertising.css"; // Import your CSS file

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const ADD_ADVERTISING = gql`
  mutation AddAdvertising(
    $photos: [String]!
    $title: String!
    $captions: String!
  ) {
    addAdvertising(
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

const AddAdvertisingPage = () => {
  const [form] = Form.useForm();
  const [addAdvertising] = useMutation(ADD_ADVERTISING);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await addAdvertising({
        variables: {
          photos: values.photos ? values.photos.split(',') : [],
          title: values.title,
          captions: values.captions,
        },
      });
      form.resetFields();
      setLoading(false);
      // Optionally, you can display a success message or redirect the user
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="add-advertising-container">
      <h2>Add New Advertising</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="advertising-form"
      >
       
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input />
          <Form.Item
          label="Photos (comma-separated URLs)"
          name="photos"
          rules={[{ required: true, message: 'Please enter at least one photo URL' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        </Form.Item>
        <Form.Item
          label="Captions"
          name="captions"
          rules={[{ required: true, message: 'Please enter the captions' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="advertising-form-button">
            Add Advertising
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const AddAdvertisingPageWithApollo = () => (
  <ApolloProvider client={client}>
    <AddAdvertisingPage />
  </ApolloProvider>
);

export default AddAdvertisingPageWithApollo;
