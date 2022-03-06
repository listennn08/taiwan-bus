import { gql } from 'apollo-server-express'

export const routeTypeDefs = gql`
  type SubRoute {
    SubRouteUID: String
    SubRouteName: Name
    Headsign: String
    HeadsignEn: String
    Direction: Int
    FirstBusTime: String
    LastBusTime: String
    HolidayFirstBusTime: String
    HolidayLastBusTime: String
  }

  type Route {
    RouteUID: String!
    HasSubRoutes: Boolean!
    SubRoutes: [SubRoute]!
    Operators: [Operator]
    BusRouteType: Int!
    RouteName: Name
    DepartureStopNameZh: String
    DepartureStopNameEn: String
    DestinationStopNameZh: String
    DestinationStopNameEn: String
    TicketPriceDescriptionZh: String
    TicketPriceDescriptionEn: String
    FareBufferZoneDescriptionZh: String
    FareBufferZoneDescriptionEn: String
    City: String
  }

  type RouteStop {
    StopUID: String
    StopName: Name
    StopBoarding: Int
    StopSequence: Int
    StopPosition: Point
    StationID: String
    TimeInfo: EstimateTime
  }

  type Estimate {
    PlateNumb: String
    EstimateTime: Int
    IsLastBus: Boolean
    VehicleStopStatus: Int
  }

  type EstimateTime {
    PlateNumb: String 
    StopUID: String
    StopName: Name
    RouteUID: String
    RouteName: Name
    SubRouteUID: String
    SubRouteName: Name
    Direction: Int
    EstimateTime: Int
    StopCountDown: Int
    CurrentStop: String
    DestinationStop: String
    StopSequence: Int
    StopStatus: Int
    MessageType: Int
    NextBusTime: String
    IsLastBus: Boolean
    Estimates: [Estimate]
    UpdateTime: String
  }

  type StopOfRoute {
    RouteUID: String
    RouteName: Name
    SubRouteUID: String
    SubRouteName: Name
    Direction: Int
    Stops: [RouteStop]
  }

  type Operator {
    OperatorID: String
    OperatorName: Name
    OperatorCode: String
    OperatorNo: String
  }

  extend type Query {
    routesByCity(city: String!, keyword: String): [Route]
    allRouteByKeyword(keyword: String!): [Route]
    particularRoute(city: String!, routeName: String!): [Route]
    particularStopOfRoute(city: String!, routeName: String!, routeUID: String): [StopOfRoute]
  }
`