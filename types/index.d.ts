interface IMapProp {
  shape: IBusShape[]
  direction: number
  routeInfo: IBusStopOfRoute[]
  currentStopId: string
  className?: string
}
interface ICity {
  City: string
  CityName: string
}

interface IBusStop {
  // 站牌唯一識別代碼
  StopUID: string
  // 站牌名稱
  StopName: TName
  // 站牌位置
  StopPosition: TPoint
  // 站牌地址
  StopAddress?: string
  // 方位角，E:東行;W:西行;S:南行;N:北行;SE:東南行;NE:東北行;SW:西南行;NW:西北行
  Bearing?: 'E' | 'W' | 'S' | 'N' | 'SE' | 'NE' | 'SW' | 'NW'
  // 站牌權管所屬縣市(相當於市區公車API的City參數)[若為公路/國道客運路線則為空值]
  City?: string
}

interface IStop {
  // 站牌唯一識別代碼
  StopUID: string
  // 站牌名稱
  StopName: TName
  // 上下車站別 : [-1:'可下車',0:'可上下車',1:'可上車']
  StopBoarding?: -1 | 0 | 1
  // 路線經過站牌之順序
  StopSequence: number
  //  站牌位置
  StopPosition: TPoint
  // 站牌所屬的站位ID
  StationID?: string
  TimeInfo?: IBusN1EstimateTime
}

interface IBusStopOfRoute {
  // 路線唯一識別代碼
  RouteUID: string
  // 路線名稱
  RouteName: TName
  // 附屬路線唯一識別代碼
  SubRouteUID: string
  // 附屬路線名稱
  SubRouteName: TName
  // 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  Direction?: 0 | 1 | 2 | 255
  // 所有經過站牌
  Stops: IStop[]
}

interface IBusRoute {
  // 路線唯一識別代碼，規則為 {業管機關簡碼} + {RouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  RouteUID: string
  // 實際上是否有多條附屬路線。(此欄位值與SubRoutes結構並無強烈的絕對關聯。詳細說明請參閱swagger上方的【資料服務使用注意事項】)
  HasSubRoutes: boolean
  // (Array[BusSubRoute], optional): 附屬路線資料(如果原始資料並無提供附屬路線ID，而本平台基於跨來源資料之一致性，會以SubRouteID=RouteID產製一份相對應的附屬路線資料(若有去返程，則會有兩筆))
  SubRoutes?: IBusSubRoute[]
  // 營運業者
  Operators: TRouteOperator[]
  // 公車路線類別 : [11:'市區公車',12:'公路客運',13:'國道客運',14:'接駁車']
  BusRouteType: 11 | 12 | 13 | 14
  // 路線名稱
  RouteName: TName
  // 起站中文名稱
  DepartureStopNameZh?: string
  // 起站英文名稱
  DepartureStopNameEn?: string
  // 終點站中文名稱
  DestinationStopNameZh?: string
  // 終點站英文名稱
  DestinationStopNameEn?: string
  // 票價中文敘述
  TicketPriceDescriptionZh?: string
  // 票價英文敘述
  TicketPriceDescriptionEn?: string
  // 收費緩衝區中文敘述
  FareBufferZoneDescriptionZh?: string
  // 收費緩衝區英文敘述
  FareBufferZoneDescriptionEn?: string
  // 路線權管所屬縣市(相當於市區公車API的City參數)[若為公路/國道客運路線則為空值]
  City?: string
}

interface IBusSubRoute {
  SubRouteUID: string
  SubRouteName: TName
  // 車頭描述
  Headsign?: string
  HeadsignEn?: string
  // 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  Direction: 0 | 1 | 2 | 255 
  FirstBusTime?: string
  LastBusTime?: string
  HolidayFirstBusTime?: string
  HolidayLastBusTime?: string
}

type TName = {
  Zh_tw?: string
  En?: string
}

type TPoint = {
  PositionLon?: number
  PositionLat?: number
  GeoHash?: string
}

type TRouteOperator = {
  OperatorID: string
  OperatorName: TName
  OperatorCode: string
  OperatorNo: string
}

type TOperatorInfo = {
  // 資料提供平台代碼
  ProviderID: string
  // 營運業者代碼
  OperatorID: string
  // 營運業者名稱
  OperatorName: TName
  // 營運業者連絡電話
  OperatorPhone?: string
  // 營運業者電子信箱
  OperatorEmail?: string
  // 營運業者網址鏈結
  OperatorUrl?: string
  // 訂票網址鏈結
  ReservationUrl?: string
  // 訂票連絡電話
  ReservationPhone?: string
  // 營運業者簡碼
  OperatorCode: string
  // 營運業者業管機關簡碼(對於於公路客運/國道客運而言為THB)
  AuthorityCode: string
  // 營運業者所屬業管子機關簡碼(對於公路客運/國道客運路線而言為區監理所如THB-VO10-1..等)
  SubAuthorityCode?: string
  // 營運業者編號[交通部票證資料系統定義]
  OperatorNo: string
  // 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  UpdateTime: string
}

interface IBusStation {
  // 站位唯一識別代碼，規則為 {業管機關簡碼} + {StationID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  StationUID: string
  // 站位名稱
  StationName: TName
  // 站位位置
  StationPosition: TPoint
  // 站位地址
  StationAddress?: string
  // 站牌與所行經此站牌之路線列表(資料會對路線展開，因此可能會有重複的站牌資料)
  Stops?: IStationStop[]
  // 方位角，E:東行;W:西行;S:南行;N:北行;SE:東南行;NE:東北行;SW:西南行;NW:西北行
  Bearing?: 'E' | 'W' | 'S' | 'N' | 'SE' | 'NE' | 'SW' | 'NW'
}

interface IStationStop {
  // 站牌唯一識別代碼
  StopUID: string
  // 站牌名稱
  StopName: TName
  // 路線唯一識別代碼
  RouteUID: string
  // 路線名稱
  RouteName: TName
}

type TEstimate = {
  // 車輛車牌號碼
  PlateNumb?: string
  // 車輛之到站時間預估(秒)
  EstimateTime?: number
  // 是否為末班車
  IsLastBus?: boolean

  /**
   * 車輛於該站之進離站狀態
   * @example
   *   0: '離站'
   *   1: '進站'
   */
  VehicleStopStatus?: 0 | 1
}

interface IBusN1EstimateTime {
  // 車牌號碼 [値為値為-1時，表示目前該站位無車輛行駛]
  PlateNumb?: string 
  // 站牌唯一識別代碼
  StopUID?: string
  // 站牌名
  StopName?: TName
  //  路線唯一識別代碼
  RouteUID?: string
  // 路線名稱
  RouteName?: TName
  // 子路線唯一識別代碼
  SubRouteUID?: string
  // 子路線名稱
  SubRouteName?: TName

  /**
   * 去返程(該方向指的是此車牌車輛目前所在路線的去返程方向，非指站站牌所在路線的去返程方向，使用時請加值業者多加注意)
   * @example
   *   0:   '去程'
   *   1:   '返程'
   *   2:   '迴圈'
   *   255: '未知'
   */
  Direction?: 0 | 1 | 2 | 255

  /**
   * 到站時間預估(秒)
   * 當StopStatus値為2~4或PlateNumb値為-1時，EstimateTime値為null
   * 當StopStatus値為1時， EstimateTime値多數為null，僅部分路線因有固定發車時間，故EstimateTime有値
   * 當StopStatus値為0時，EstimateTime有値
   */
  EstimateTime?: number

  // 車輛距離本站站數
  StopCountDown?: number
  // 車輛目前所在站牌代碼
  CurrentStop?: string
  // 車輛目的站牌代碼
  DestinationStop?: string

  // 路線經過站牌之順序
  StopSequence?: number

  /**
   * 車輛狀態備註
   * @example
   *   0: '正常'
   *   1: '尚未發車'
   *   2: '交管不停靠'
   *   3: '末班車已過'
   *   4: '今日未營運'
   */
  StopStatus?: 0 | 1 | 2 | 3 | 4

  /**
   * 資料型態種類 
   * @example
   *   0: '未知'
   *   1: '定期'
   *   2: '非定期'
   */
  MessageType?: 0 | 1 | 2

  // 下一班公車到達時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  NextBusTime?: string

  // 是否為末班車
  IsLastBus?: boolean
  /**
   * 到站時間預估
   * 僅高雄市、桃園市、台中市提供
   */
  Estimates?: TEstimate[]
  UpdateTime: string
}

interface IBusSchedule {
  // 路線唯一識別代碼
  RouteUID: string
  // 地區既用中之路線代碼(為原資料內碼)
  RouteID: string
  // 路線名稱
  RouteName: TName
  // 附屬路線唯一識別代碼
  SubRouteUID: string
  // 地區既用中之附屬路線代碼(為原資料內碼)
  SubRouteID: string
  // 附屬路線名稱
  SubRouteName: TName
  // 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  Direction: 0 | 1 | 2 | 3 | 255
  // 營運業者代碼
  OperatorID?: string
  // 營運業者簡碼
  OperatorCode?: string
  // 預定班表
  Timetables?: TBusTimetable[]
  // 發車班距
  Frequencys?: TBusFrequency[]
  // 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  UpdateTime: string
}

type TBusTimetable = {
  // 班次代碼
  TripID?: string
  // 週內營運日
  ServiceDay?: TServiceDay
  // 特殊營運日
  SpecialDays?: TSpecialDay[]
  // 公車停靠時間資料
  StopTimes: TBusStopTime[]
}

type TBusFrequency = {
  // 發車班距起始適用時間，格式為: HH:mm
  StartTime: string
  // 發車班距結束適用時間，格式為: HH:mm
  EndTime: string
  // 最小班距時間(分鐘)
  MinHeadwayMins: number
  // 最大班距時間(分鐘)
  MaxHeadwayMins: number
  // 週內營運日
  ServiceDay?: TServiceDay
  // 特殊營運日
  SpecialDays?: TSpecialDay[]
}

type TServiceDay = {
  [key: string]: 0 | 1
  // 星期日是否營運 : [0:'否',1:'是']
  Sunday: 0 | 1
  // 星期一是否營運 : [0:'否',1:'是']
  Monday: 0 | 1
  // 星期二是否營運 : [0:'否',1:'是']
  Tuesday: 0 | 1
  // 星期三是否營運 : [0:'否',1:'是']
  Wednesday: 0 | 1
  // 星期四是否營運 : [0:'否',1:'是']
  Thursday: 0 | 1
  // 星期五是否營運 : [0:'否',1:'是']
  Friday: 0 | 1
  // 星期六是否營運 : [0:'否',1:'是']
  Saturday: 0 | 1
  // 國定假日營運與否 : [0:'否',1:'是']
  NationalHolidays?: 0 | 1
}

type TSpecialDay = {
  // 不連續特殊日期
  Dates?: string[]
  //  連續特殊日期
  DatePeriod?: TDatePeriod
  // 營運服務狀態代碼 : [0:'正常營運',1:'加班營運',2:'取消/停駛營運']
  ServiceStatus?: number
  // 特殊營運描述
  Description?: string
}
type TBusStopTime = {
  // 路線經過站牌之順序(由1開始)
  StopSequence: number
  // 站牌唯一識別代碼
  StopUID: string
  // 地區既用中之站牌代碼(為原資料內碼)
  StopID: string
  // 站牌名稱
  StopName: TName
  // 到站時間，格式為:HH:mm
  ArrivalTime: string
  // 離站時間，格式為:HH:mm
  DepartureTime: string
}

type TDatePeriod = {
  // 營運起始日(格式: yyyy-MM-dd)
  StartDate?: string
  // 營運結束日(格式: yyyy-MM-dd)
  EndDate?: string
}

interface IBusShape {
  // 路線唯一識別代碼
  RouteUID: string
  // 地區既用中之路線代碼(為原資料內碼)
  RouteID: string
  // 路線名稱
  RouteName: TName
  // 附屬路線唯一識別代碼
  SubRouteUID: string
  // 附屬路線唯一識別代碼
  SubRouteID?: string
  // 附屬路線名稱
  SubRouteName?: TName
  // 去返程，若無值則表示來源尚無區分去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  Direction: 0 | 1 | 2 | 255
  // well-known text，為路線軌跡資料
  Geometry: string
  // 路線軌跡編碼(encoded polyline)
  EncodedPolyline: string
  // 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  UpdateTime: string
  geo?: [number, number][]
}