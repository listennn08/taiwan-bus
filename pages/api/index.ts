
import { AxiosPromise, AxiosResponse } from 'axios'
import { DocumentNode, print } from 'graphql'
import { CITIES, OPERATOR_INFO, PARTICULAR_ROUTE, PARTICULAR_ROUTE_STOP, ROUTES_BY_CITY, ROUTE_BY_KEYWORD, SCHEDULE, SHAPE, STATIONS_BY_KEYWORD } from './constants'

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

type TVariables = {
  [key: string]: string | string[] | number | undefined
}
type Request = (
  node: DocumentNode,
  variables?: TVariables
) => Promise<AxiosResponse<any, any>>


function formatRequestUrl(url: string, params: APIParam = {}) {
  const requestUrl = Object.keys(params)
  .reduce((resp, key) => {
    if (params[key]) return `${resp}&$${key}=${params[key]}`
    return resp
  }, `${url}?$format=JSON`)

  // console.log(requestUrl)
  return encodeURI(requestUrl)
}

const graphqlRequest: Request = (node, variables) => axios.post('/graphql', {
  query: print(node),
  variables
})

export const getCity = () => graphqlRequest(CITIES)


export const getRoutes = ({ city, keyword }: { city?: string, keyword?: string }) => {
  if (city) {
    return graphqlRequest(ROUTES_BY_CITY, { city, keyword })
  }

  return graphqlRequest(ROUTE_BY_KEYWORD, { keyword })
}

export const getStations = ({
  city,
  keyword
}: {
  city: string,
  keyword?: string
}) => graphqlRequest(STATIONS_BY_KEYWORD, { city, keyword })

export const getSpecificRouteStop = ({
  city,
  routeName,
  routeUID
}: {
  city: string,
  routeName: string
  routeUID: string,
}) => graphqlRequest(PARTICULAR_ROUTE_STOP, { city, routeName, routeUID })

export const getOperator = ({ city, operatorId }: { city: string, operatorId: string }) =>
  graphqlRequest(OPERATOR_INFO, { city, operatorId })

  export const getRouteShape = ({
    city,
    routeName,
    routeUID
  }: {
    city: string,
    routeName: string
    routeUID: string,
  }) => graphqlRequest(SHAPE, { city, routeName, routeUID })

export const getRouteSchedule = ({
  city,
  routeName,
  routeUID
}: {
  city: string,
  routeName: string
  routeUID: string,
}) => graphqlRequest(SCHEDULE, { city, routeName, routeUID })

export const getParticularRoute = ({
  city,
  routeName,
  routeUID
}: {
  city: string,
  routeName: string
  routeUID: string,
}) => graphqlRequest(PARTICULAR_ROUTE, { city, routeName, routeUID })


export const getRouteByCity: busQuery<IBusRoute[]> = ({
  city,
  ...params
}) => axios.get(formatRequestUrl(`/Route/City/${city}`, { ...params }))
