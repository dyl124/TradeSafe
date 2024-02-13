const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    companies: [Company]
    postings: [Posting]
    discrepancies: [Discrepancy]
  }

  type Discrepancy {
    _id: ID
    dateOfWorks: String
    dateOfSubmission: String
    complaints: String
    photosOfWork: [String]
    scopeOfWorks: String
    company: Company
    posting: Posting
    user: [User]
  }

  type Company {
    _id: ID
    name: String
    abn: String
    mobile: String
    email: String
    recentWorkPhotos: [String]
    director: [User]
  }

  type Posting {
    _id: ID
    title: String
    caption: String
    photos: [String]
    priceRange: PriceRange
    creator: [User]
  }

  type Advertising {
    _id: ID
    photos: [String]
    title: String
    captions: String
    createdAt: String
    updatedAt: String
    company: Company
    creator: [User]
  }


  type PriceRange {
    min: Int
    max: Int
  }

  type Item {
    name: String
    description: String
    price: Int
    currency: String
  }

  type Payment {
    method: String
    amount: Int
    currency: String
  }

  type Shipping {
    address: String
  }

  type Query {
    user: User
    companies: [Company]
    postings: [Posting]
    advertisings: [Advertising]
    discrepancies: [Discrepancy]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth

    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    
    login(email: String!, password: String!): Auth

    addCompany(
      name: String!
      abn: String
      mobile: String
      email: String!
      recentWorkPhotos: [String]
    ): Company

    updateCompany(
      id: ID!
      name: String
      abn: String
      mobile: String
      email: String
      recentWorkPhotos: [String]
    ): Company

    deleteCompany(id: ID!): Company

    addPosting(
      title: String!
      caption: String!
      photos: [String]!
      priceRange: PriceRangeInput!
    ): Posting

    updatePosting(
      id: ID!
      title: String
      caption: String
      photos: [String]
      priceRange: PriceRangeInput
    ): Posting

    deletePosting(id: ID!): Posting

    addAdvertising(
      photos: [String]!
      title: String!
      captions: String!
    ): Advertising

    updateAdvertising(
      id: ID!
      photos: [String]
      title: String
      captions: String
    ): Advertising

    deleteAdvertising(id: ID!): Advertising


    addDiscrepancy(
      dateOfWorks: String
      complaints: String
      photosOfWork: [String]
      scopeOfWorks: String
      company: ID
      posting: ID
      user: ID
    ): Discrepancy

    updateDiscrepancy(
      id: ID!
      dateOfWorks: String
      complaints: String
      photosOfWork: [String]
      scopeOfWorks: String
      company: ID
      posting: ID
      user: ID
    ): Discrepancy

    deleteDiscrepancy(id: ID!): Discrepancy
  }

  input PriceRangeInput {
    min: Int
    max: Int
  }

  input ItemInput {
    name: String
    description: String
    price: Int
    currency: String
  }

  input PaymentInput {
    method: String
    amount: Int
    currency: String
  }

  input ShippingInput {
    address: String
  }
`;

module.exports = typeDefs;
