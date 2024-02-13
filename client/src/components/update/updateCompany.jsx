import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from 'antd';
import "./updateCompany.css"; // Import your CSS file


const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const UPDATE_COMPANY = gql`
  mutation UpdateCompany(
    $id: ID!
    $name: String
    $abn: String
    $mobile: String
    $email: String
    $recentWorkPhotos: [String]
  ) {
    updateCompany(
      id: $id
      name: $name
      abn: $abn
      mobile: $mobile
      email: $email
      recentWorkPhotos: $recentWorkPhotos
    ) {
      _id
      name
      abn
      mobile
      email
      recentWorkPhotos
    }
  }
`;

const AddCompanyPage = () => {
  const [form] = Form.useForm();
  const [updateCompany] = useMutation(UPDATE_COMPANY);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await updateCompany({
        variables: {
          id: values.id,
          name: values.name,
          abn: values.abn,
          mobile: values.mobile,
          email: values.email,
          recentWorkPhotos: values.recentWorkPhotos ? values.recentWorkPhotos.split(',') : [],
        },
      });

      form.resetFields();
      setLoading(false);
      console.log('Company updated successfully');
    } catch (error) {
      console.error('Error updating company:', error);
      setLoading(false);
    }
  };
  

  return (
    <div className="add-company-container">
      <h2>Update Company</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="company-form"
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: 'Please enter the company ID' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ABN"
          name="abn"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mobile"
          name="mobile"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Recent Work Photos"
          name="recentWorkPhotos"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="company-form-button">
            Update Company
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
const AddCompanyPageWithApollo = () => (
  <ApolloProvider client={client}>
    <AddCompanyPage />
  </ApolloProvider>
);

export default AddCompanyPageWithApollo;
