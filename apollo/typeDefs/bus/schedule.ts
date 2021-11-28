import { gql } from 'apollo-server-core'

export const serviceInfoTypeDefs = gql`
  type ScheduleInfo {
    RouteUID: String
    ServiceDay: [String]
  }

  extend type Query {
    schedule(city: String!, routeName: String!, routeUID: String!): ScheduleInfo
  }
`