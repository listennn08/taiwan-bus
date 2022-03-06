import { gql } from 'apollo-server-core'

export const shapeTypeDefs = gql`
  type ShapeInfo {
    RouteUID: String
    RouteID: String
    RouteName: Name
    SubRouteUID: String
    SubRouteID: String
    SubRouteName: Name
    Direction: Int
    Geometry: String
    EncodedPolyline: String
    UpdateTime: String
    geo: [[Float]]
  }

  extend type Query {
    shape(city: String!, routeName: String!, routeUID: String!): [ShapeInfo]
  }
`