export const infoFields = [
  'RouteUID',
  'Operators',
  'RouteName',
  'DepartureStopNameZh',
  'DepartureStopNameEn',
  'DestinationStopNameZh',
  'DestinationStopNameEn',
  'City',
].join()

export const estimateTimeFields = [
  'RouteUID',
  'Direction',
  'EstimateTime',
  'StopStatus',
  'StopUID',
].join()

export const realTimeFields = [
  'BusStatus',
  'Direction',
  'DutyStatus',
  'PlateNumb',
  'StopUID',
]

export const stopStatusMap = [
  '尚未發車',
  '交管不停靠',
  '末班車已過',
  '今日未營運',
]
