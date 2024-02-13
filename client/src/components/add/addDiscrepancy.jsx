import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from 'antd';
import "./addDiscrepancy.css"; // Import your CSS file

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const ADD_DISCREPANCY = gql`
  mutation AddDiscrepancy(
    $dateOfWorks: String!
    $complaints: String!
    $photosOfWork: [String]!
    $scopeOfWorks: String!
    $company: ID!
    $posting: ID
    $user: ID!
  ) {
    addDiscrepancy(
      dateOfWorks: $dateOfWorks
      complaints: $complaints
      photosOfWork: $photosOfWork
      scopeOfWorks: $scopeOfWorks
      company: $company
      posting: $posting
      user: $user
    ) {
      _id
      dateOfWorks
      complaints
      photosOfWork
      scopeOfWorks
    }
  }
`;

const AddDiscrepancyPage = () => {
  const [form] = Form.useForm();
  const [addDiscrepancy] = useMutation(ADD_DISCREPANCY);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await addDiscrepancy({
        variables: {
          dateOfWorks: values.dateOfWorks,
          complaints: values.complaints,
          photosOfWork: values.photosOfWork ? values.photosOfWork.split(',') : [],
          scopeOfWorks: values.scopeOfWorks,
          company: values.company,
          posting: values.posting,
          user: values.user,
        },
      });
      form.resetFields();
      setLoading(false);
      // Optionally, you can display a success message or redirect the user
      console.log('Discrepancy added successfully');
    } catch (error) {
      console.error('Error adding discrepancy:', error);
      setLoading(false);
    }
  };

  return (
    <div className="add-discrepancy-container">
      <h2>Add New Discrepancy</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="discrepancy-form"
      >
        <Form.Item
          label="Date of Works"
          name="dateOfWorks"
          rules={[{ required: true, message: 'Please enter the date of works' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Complaints"
          name="complaints"
          rules={[{ required: true, message: 'Please enter the complaints' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Photos of Work (comma-separated URLs)"
          name="photosOfWork"
          rules={[{ required: true, message: 'Please enter at least one photo URL' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Scope of Works"
          name="scopeOfWorks"
          rules={[{ required: true, message: 'Please enter the scope of works' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Company"
          name="company"
          rules={[{ required: true, message: 'Please enter the company ID' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Posting"
          name="posting"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="User"
          name="user"
          rules={[{ required: true, message: 'Please enter the user ID' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Discrepancy
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const AddDiscrepancyPageWithApollo = () => (
  <ApolloProvider client={client}>
    <AddDiscrepancyPage />
  </ApolloProvider>
);

export default AddDiscrepancyPageWithApollo;
