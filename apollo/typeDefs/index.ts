import { gql } from 'apollo-server-express'
import { operatorTypeDefs } from './bus/operator'
import { routeTypeDefs } from './bus/route'
import { serviceInfoTypeDefs } from './bus/schedule'
import { shapeTypeDefs } from './bus/shape'
import { stationTypeDefs } from './station'

export const shareTypeDefs = gql`
  type City {
    CityID: String!
    CityName: String
    City: String!
  }

  type Name {
    Zh_tw: String
    En: String
  }

  type Point {
    PositionLon: Float
    PositionLat: Float
    GeoHash: String
  }

  type BusStop {
    StopUID: String
    StopName: Name
    StopPosition: Point
    StopAddress: String
    Bearing: String
    City: String
  }

  type Query {
    cities: [City]
  }
`

export const typeDefs = [
  shareTypeDefs,
  routeTypeDefs,
  operatorTypeDefs,
  stationTypeDefs,
  serviceInfoTypeDefs,
  shapeTypeDefs,
]