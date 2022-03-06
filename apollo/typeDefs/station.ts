import { gql } from 'apollo-server-express'

export const stationTypeDefs = gql`
  type StationStop {
    StopUID: String
    StopName: Name
    RouteUID: String
    RouteName: Name
  }
  type Station {
    StationUID: String
    StationName: Name
    StationPosition: Point
    StationAddress: String
    Stops: [StationStop]
    Bearing: String
  }

  extend type Query {
    nearStations(latlng: [Float]!): [Station]
    stationsByKetword(city: String!, keyword: String): [Station]
  }
`