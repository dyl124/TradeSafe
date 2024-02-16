import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from 'antd';
import "./updateDiscrepancy.css"; // Import your CSS file

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const UPDATE_DISCREPANCY = gql`
  mutation UpdateDiscrepancy(
    $id: ID!
    $dateOfWorks: String
    $complaints: String
    $photosOfWork: [String]
    $scopeOfWorks: String
    $company: ID
    $posting: ID
    $user: ID
  ) {
    updateDiscrepancy(
      id: $id
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

const UpdateDiscrepancyPage = () => {
  const [form] = Form.useForm();
  const [updateDiscrepancy] = useMutation(UPDATE_DISCREPANCY);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await updateDiscrepancy({
        variables: {
          id: values.id,
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
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="update-discrepancy-container">
      <h2>Update Discrepancy</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="discrepancy-form"
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: 'Please enter the discrepancy ID' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Date of Works"
          name="dateOfWorks"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Complaints"
          name="complaints"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Photos of Work (comma-separated URLs)"
          name="photosOfWork"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Scope of Works"
          name="scopeOfWorks"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Company"
          name="company"
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
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="posting-form-button">
            Update Discrepancy
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const UpdateDiscrepancyPageWithApollo = () => (
  <ApolloProvider client={client}>
    <UpdateDiscrepancyPage />
  </ApolloProvider>
);

export default UpdateDiscrepancyPageWithApollo;
