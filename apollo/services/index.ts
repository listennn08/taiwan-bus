import { AxiosPromise } from 'axios'

import { GET } from './core'

type TParam = string | number | undefined

interface APIParam {
  [key: string]: TParam
  city?: string
  routeName?: string
  top?: number
  filter?: string
  page?: number
  skip?: number
  select?: string
}

type busQuery<T> = (p: APIParam) => AxiosPromise<T>

function formatRequestUrl(url: string, params: APIParam = {}) {
  const requestUrl = Object.keys(params)
  .reduce((resp, key) => {
    if (params[key]) return `${resp}&$${key}=${params[key]}`
    return resp
  }, `${url}?$format=JSON`)

  // console.log(requestUrl)
  return encodeURI(requestUrl)
}

/**
 * 透過城市取得路線
 */
export const getRouteByCity: busQuery<IBusRoute[]> = ({
  city,
  ...params
}) => GET(formatRequestUrl(`/Route/City/${city}`, { ...params }))

/**
 * 透過路線名稱取得路線
 */
export const getRouteByRouteName: busQuery<IBusRoute[]> = ({
  city,
  routeName,
  ...params
}) => GET(formatRequestUrl(`/Route/City/${city}/${routeName}`, params))

/**
 * 取得路線停靠順序
 */
export const getBusStopOfRoute: busQuery<IBusStopOfRoute[]> = ({
  city,
  routeName,
  ...params
}) => GET(formatRequestUrl(`/StopOfRoute/City/${city}/${routeName}`, params))


/**
 * 取得預計抵達時間
 */
export const getEstimatedTimeOfArrival: busQuery<IBusN1EstimateTime[]> = ({
  city,
  routeName,
  ...params
}) => GET(formatRequestUrl(`/EstimatedTimeOfArrival/City/${city}/${routeName}`, params))

/**
 * 透過關鍵字取得站點
 */
export const getStationsByKeyword: busQuery<IBusStation[]> = ({
  city,
  ...params
}) => GET(formatRequestUrl(`/Station/City/${city}`, params))

/**
 * get station near by user
 */
export const getNearStations: busQuery<IBusStation[]> = (params) =>
  GET(formatRequestUrl('/Station/NearBy', params))


export const getOperator = ({ city, ...params }: APIParam) =>
  GET(formatRequestUrl(`/Operator/City/${city}`, params))

export const getRouteSchedule = ({ city, routeName, ...params}: APIParam) =>
  GET(formatRequestUrl(`/Schedule/City/${city}/${routeName}`, params))

export const getRouteShape = ({ city, routeName, ...params}: APIParam) =>
  GET(formatRequestUrl(`/Shape/City/${city}/${routeName}`, params))
