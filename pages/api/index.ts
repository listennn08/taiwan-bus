
import { AxiosResponse } from 'axios'
import { DocumentNode, print } from 'graphql'
import { CITIES, OPERATOR_INFO, PARTICULAR_ROUTE, ROUTES_BY_CITY, ROUTE_BY_KEYWORD, SCHEDULE, SHAPE, STATIONS_BY_KEYWORD } from './constants'

type TVariables = {
  [key: string]: string | string[] | number | undefined
}
type Request = (
  node: DocumentNode,
  variables?: TVariables
) => Promise<AxiosResponse<any, any>>


const graphqlRequest: Request = (node, variables) => axios.post('/graphql', {
  query: print(node),
  variables
})

export const getCity = () => graphqlRequest(CITIES)


export const getRoutes = ({ city, keyword }: { city?: string, keyword: string }) => {
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

export const getSpecificRoute = ({
  city,
  routeName,
  routeUID
}: {
  city: string,
  routeName: string
  routeUID: string,
}) => graphqlRequest(PARTICULAR_ROUTE, { city, routeName, routeUID })

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