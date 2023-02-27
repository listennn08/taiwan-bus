interface CityResponse {
  CityID: string
  CityName: string
  CityCode: string
  City: string
  CountyID: string
  Version: string
}

interface CityOption {
  label: string
  value: string
}

interface Name {
  Zh_tw: string
  En: string
}

interface Operator {
  OperatorID: string
  OperatorName: Name
  OperatorCode: string
  OperatorNo: string
}

interface SubRoute {
  SubRouteUID: string
  SubRouteID: string
  OperatorIDs: string[]
  SubRouteName: Name
  Direction: number
  FirstBusTime: string
  LastBusTime: string
  HolidayFirstBusTime: string
  HolidayLastBusTime: string
}

interface RouteInfo extends Record<string, any> {
  RouteUID: string
  // RouteID: string
  HasSubRoutes: boolean
  Operators: Operator[]
  // AuthorityID: string
  // ProviderID: string
  // SubRoutes: SubRoute[]
  // BusRouteType: number
  RouteName: Name
  DepartureStopNameZh: string
  DepartureStopNameEn: string
  DestinationStopNameZh: string
  DestinationStopNameEn: string
  // TicketPriceDescriptionZh: string
  // TicketPriceDescriptionEn: string
  // RouteMapImageUrl: string
  City: string
  // CityCode: string
  UpdateTime: string
  VersionID: number
}

interface Position {
  PositionLon: number
  PositionLat: number
  GeoHash: string
}

interface Stop {
  StopUID: string
  StopID: string
  StopName: Name
  StopBoarding: number
  StopSequence: number
  StopPosition: Position
  StationID: string
  StationGroupID: string
  LocationCityCode: string
}

interface StopOfRoute {
  RouteUID: string
  RouteID: string
  RouteName: Name
  Direction: number
  Stops: Stop[]
  UpdateTime: string
  VersionID: number
}

interface Estimate {
  PlateNumb: string
  EstimateTime: number
  IsLastBus: boolean
  VehicleStopStatus: number
}

interface EstimatedTimeOfArrival {
  PlateNumb: string
  StopUID: string
  StopID: string
  StopName: Name
  RouteUID: string
  RouteID: string
  RouteName: Name
  SubRouteUID: string
  SubRouteID: string
  SubRouteName: Name
  Direction: number
  EstimateTime: num
  StopCountDown: number
  CurrentStop: string
  DestinationStop: string
  StopSequence: number
  StopStatus: number
  MessageType: number
  NextBusTime: string
  IsLastBus: boolean
  Estimates: Estimate[]
  DataTime: string
  TransTime: string
  SrcRecTime: string
  SrcTransTime: string
  SrcUpdateTime: string
  UpdateTime: string
}

interface RealTimeNearStop {
  PlateNumb: string
  OperatorID: string
  OperatorNo: string
  RouteUID: string
  RouteID: string
  RouteName: Name
  SubRouteUID: string
  SubRouteID: string
  SubRouteName: Name
  Direction: number
  StopUID: string
  StopID: string
  StopName: Name
  StopSequence: number
  MessageType: number
  DutyStatus: number
  BusStatus: number
  A2EventType: number
  GPSTime: string
  TransTime: string
  SrcRecTime: string
  SrcTransTime: string
  SrcUpdateTime: string
  UpdateTime: string
}

interface FavStop extends Stop {
  endStop: string
  direction: number
  city: string
  routeName: string
  estimateTime?: string
}
