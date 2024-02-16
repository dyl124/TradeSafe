import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from 'antd';
import "./addPosting.css"; // Import your CSS file

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const ADD_POSTING = gql`
  mutation AddPosting(
    $title: String!
    $caption: String!
    $photos: [String]!
    $priceRange: PriceRangeInput!
  ) {
    addPosting(
      title: $title
      caption: $caption
      photos: $photos
      priceRange: $priceRange
    ) {
      _id
      title
      caption
      photos
    }
  }
`;

const AddPostingPage = () => {
  const [form] = Form.useForm();
  const [addPosting] = useMutation(ADD_POSTING);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await addPosting({
        variables: {
          title: values.title,
          caption: values.caption,
          photos: values.photos ? values.photos.split(',') : [],
          priceRange: {
            min: parseFloat(values.minPrice),
            max: parseFloat(values.maxPrice),
          },
        },
      });
      form.resetFields();
      setLoading(false);
      // Optionally, you can display a success message or redirect the user
    } catch (error) {
      console.error('Error adding posting:', error);
      setLoading(false);
    }
  };

  return (
    <div className="add-posting-container">
    
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="posting-form"
      >
          <h2>Add New Posting</h2>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the posting title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Caption"
          name="caption"
          rules={[{ required: true, message: 'Please enter the posting caption' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Photos (comma-separated URLs)"
          name="photos"
          rules={[{ required: true, message: 'Please enter at least one photo URL' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Minimum Price"
          name="minPrice"
          rules={[{ required: true, message: 'Please enter the minimum price' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Maximum Price"
          name="maxPrice"
          rules={[{ required: true, message: 'Please enter the maximum price' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="posting-form-button">
            Add Posting
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const AddPostingPageWithApollo = () => (
  <ApolloProvider client={client}>
    <AddPostingPage />
  </ApolloProvider>
);

export default AddPostingPageWithApollo;
