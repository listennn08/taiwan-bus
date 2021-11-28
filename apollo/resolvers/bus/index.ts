import { operator } from './operator'
import { routeQueries } from './route'
import { schedule } from './schedule'
import { shape } from './shape'

export const busRouteQueries = {
  Query: {
    operator,
    schedule,
    shape,
    ...routeQueries,
  }
}