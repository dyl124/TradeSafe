const typeDefs = `
type Company {
  _id: ID
  name: String
  abn: String
  mobile: String
  email: String
  userName: String
  password: String
  recentWorkPhotos: [String]
}

type Posting {
  _id: ID
  title: String
  caption: String
  photos: [String]
  priceRange: PriceRange
  company: Company
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
}

type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  userName: String
  password: String
  companies: [Company]
  postings: [Posting]
  discrepancies: [Discrepancy]
}

type Advertising {
  _id: ID
  photos: [String]
  title: String
  captions: String
  createdAt: String
  updatedAt: String
  company: Company
}

input AdvertisingInput {
  photos: [String]
  title: String
  captions: String
  company: ID
}

type Auth {
  token: ID
  user: User
}

type PriceRange {
  min: Float
  max: Float
}

type Query {
  companies: [Company]
  postings(companyId: ID, name: String): [Posting]
  posting(id: ID!): Posting
  user: User
  discrepancy(id: ID!): Discrepancy
  advertisings: [Advertising]
}

type Mutation {
  addUser(
    firstName: String!
    lastName: String!
    email: String!
    userName: String!
    password: String!
  ): Auth
  addDiscrepancy(postingId: ID!): Discrepancy
  updateUser(
    firstName: String
    lastName: String
    email: String
    userName: String
    password: String
  ): User
  updatePosting(id: ID!, quantity: Int!): Posting
  login(email: String!, password: String!): Auth
  addAdvertising(advertisingInput: AdvertisingInput): Advertising
}


`;

module.exports = typeDefs ;
