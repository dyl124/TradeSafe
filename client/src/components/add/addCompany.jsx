import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from 'antd';
import "./addCompany.css"; // Import your CSS file


const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
const ADD_COMPANY = gql`
  mutation AddCompany(
    $name: String!
    $abn: String
    $mobile: String
    $email: String!
    $recentWorkPhotos: [String]
  ) {
    addCompany(
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
    }
  }
`;

const AddCompanyPage = () => {
  const [form] = Form.useForm();
  const [addCompany] = useMutation(ADD_COMPANY);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation AddCompany(
              $name: String!
              $abn: String
              $mobile: String
              $email: String!
              $recentWorkPhotos: [String]
            ) {
              addCompany(
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
              }
            }
          `,
          variables: {
            name: values.name,
            abn: values.abn,
            mobile: values.mobile,
            email: values.email,
            recentWorkPhotos: values.recentWorkPhotos ? values.recentWorkPhotos.split(',') : [],
          },
        }),
      });
      
      const data = await response.json();
  
      if (data && data.data && data.data.addCompany) {
        // Optionally, you can handle the success response here
        console.log('Company added successfully:', data.data.addCompany);
      } else {
        // Handle error response
        console.error('Error adding company:', data.errors);
      }
  
      form.resetFields();
      setLoading(false);
    } catch (error) {
      console.error('Error adding company:', error);
      setLoading(false);
    }
  };
  

  return (
    <div className="add-company-container">
      <h2>Add New Company</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="company-form"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the company name' }]}
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
          rules={[{ required: true, message: 'Please enter the email' }]}
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
            Add Company
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
