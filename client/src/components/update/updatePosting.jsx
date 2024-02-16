import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from 'antd';
import "./updatePosting.css"; // Import your CSS file

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const UPDATE_POSTING = gql`
  mutation UpdatePosting(
    $id: ID!
    $title: String
    $caption: String
    $photos: [String]
    $priceRange: PriceRangeInput
  ) {
    updatePosting(
      id: $id
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

const UpdatePostingPage = () => {
  const [form] = Form.useForm();
  const [updatePosting] = useMutation(UPDATE_POSTING);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await updatePosting({
        variables: {
          id: values.id,
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
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="update-posting-container">
      <h2>Update Posting</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="posting-form"
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: 'Please enter the posting ID' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Caption"
          name="caption"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Photos (comma-separated URLs)"
          name="photos"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Minimum Price"
          name="minPrice"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Maximum Price"
          name="maxPrice"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="posting-form-button" loading={loading}>
            Update Posting
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const UpdatePostingPageWithApollo = () => (
  <ApolloProvider client={client}>
    <UpdatePostingPage />
  </ApolloProvider>
);

export default UpdatePostingPageWithApollo;
