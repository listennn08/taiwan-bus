import { gql } from 'graphql-tag'

export const CITIES = gql`
  query Cities {
    cities {
      CityID
      CityName
      City
    }
  }
`

export const ROUTE_BY_KEYWORD = gql`
  query AllRouteByKeyword($keyword: String!) {
    allRouteByKeyword(keyword: $keyword) {
      RouteName {
        Zh_tw
      }
      RouteUID
      DepartureStopNameZh
      DestinationStopNameZh
      DepartureStopNameEn
      DestinationStopNameEn
      BusRouteType
      City
      SubRoutes {
        SubRouteUID
        SubRouteName {
          Zh_tw
          En
        }
        Direction
        FirstBusTime
        LastBusTime
        HolidayFirstBusTime
        HolidayLastBusTime
      }
      HasSubRoutes
      Operators {
        OperatorNo
        OperatorCode
        OperatorName {
          En
          Zh_tw
        }
        OperatorID
      }
    }
  }
`

export const ROUTES_BY_CITY = gql`
  query RoutesByCity($city: String!, $keyword: String) {
    routesByCity(city: $city, keyword: $keyword) {
      RouteUID
      SubRoutes {
        SubRouteUID
        SubRouteName {
          Zh_tw
          En
        }
        Direction
        FirstBusTime
        LastBusTime
        HolidayFirstBusTime
        HolidayLastBusTime
      }
      BusRouteType
      RouteName {
        Zh_tw
        En
      }
      DepartureStopNameZh
      DepartureStopNameEn
      DestinationStopNameZh
      DestinationStopNameEn
      City
      Operators {
        OperatorNo
        OperatorCode
        OperatorName {
          En
          Zh_tw
        }
        OperatorID
      }
    }
  }
`

export const STATIONS_BY_KEYWORD = gql`
  query stationsByKetword($city: String!, $keyword: String) {
    stationsByKetword(city: $city, keyword: $keyword) {
      StationUID
      StationName {
        Zh_tw
        En
      }
      StationAddress
      Stops {
        StopUID
        StopName {
          Zh_tw
          En
        }
        RouteUID
        RouteName {
          Zh_tw
          En
        }
      }
    }
  }
`

export const PARTICULAR_ROUTE_STOP = gql`
  query ParticularStopOfRoute($city: String!, $routeName: String!, $routeUID: String) {
    particularStopOfRoute(city: $city, routeName: $routeName, routeUID: $routeUID) {
      RouteUID
      RouteName {
        Zh_tw
        En
      }
      SubRouteUID
      SubRouteName {
        En
        Zh_tw
      }
      Direction
      Stops {
        TimeInfo {
          PlateNumb
          StopUID
          StopName {
            Zh_tw
            En
          }
          Estimates {
            VehicleStopStatus
            IsLastBus
            EstimateTime
            PlateNumb
          }
          IsLastBus
          NextBusTime
          MessageType
          StopStatus
          StopSequence
          DestinationStop
          CurrentStop
          StopCountDown
          EstimateTime
          Direction
          SubRouteName {
            En
            Zh_tw
          }
          SubRouteUID
          RouteName {
            En
            Zh_tw
          }
          RouteUID
          UpdateTime
        }
        StopUID
        StopName {
          En
          Zh_tw
        }
        StationID
        StopPosition {
          GeoHash
          PositionLat
          PositionLon
        }
        StopSequence
        StopBoarding
      }
    }
  }
`

export const OPERATOR_INFO = gql`
  query Operator($city: String!, $operatorId: String!) {
    operator(city: $city, operatorID: $operatorId) {
      ProviderID
      OperatorID
      OperatorName {
        Zh_tw
        En
      }
      UpdateTime
      OperatorNo
      SubAuthorityCode
      AuthorityCode
      OperatorCode
      ReservationPhone
      ReservationUrl
      OperatorEmail
      OperatorUrl
      OperatorPhone
    }
  }
`

export const SHAPE = gql`
  query Shape($city: String!, $routeName: String!, $routeUID: String!) {
    shape(city: $city, routeName: $routeName, routeUID: $routeUID) {
      RouteUID
      RouteID
      RouteName {
        En
        Zh_tw
      }
      SubRouteID
      SubRouteUID
      Direction
      Geometry
      EncodedPolyline
      UpdateTime
      SubRouteName {
        En
        Zh_tw
      }
      geo
    }
  }
`

export const SCHEDULE = gql`
  query Schedule($city: String!, $routeName: String!, $routeUID: String!) {
    schedule(city: $city, routeName: $routeName, routeUID: $routeUID) {
      RouteUID
      ServiceDay
    }
  }
`
export const PARTICULAR_ROUTE = gql`
  query ParticularRoute($city: String!, $routeName: String!) {
    particularRoute(city: $city, routeName: $routeName) {
      RouteName {
        Zh_tw
        En
      }
      DepartureStopNameZh
      DepartureStopNameEn
      DestinationStopNameZh
      DestinationStopNameEn
      TicketPriceDescriptionZh
      TicketPriceDescriptionEn
    }
  }
`