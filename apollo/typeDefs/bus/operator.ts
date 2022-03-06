import { gql } from 'apollo-server-core'

export const operatorTypeDefs = gql`
  type OperatorInfo {
    ProviderID: String
    OperatorID: String
    OperatorName: Name
    OperatorPhone: String
    OperatorEmail: String
    OperatorUrl: String
    ReservationUrl: String
    ReservationPhone: String
    OperatorCode: String
    AuthorityCode: String
    SubAuthorityCode: String
    OperatorNo: String
    UpdateTime: String
  }

  extend type Query {
    operator(city: String!, operatorID: String!): [OperatorInfo]
  }
`