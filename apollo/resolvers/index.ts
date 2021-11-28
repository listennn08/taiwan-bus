import { busRouteQueries } from './bus'
import { cityQueries } from './city'
import { stationQueries } from './station'

export const resolvers = {
  Query: {
    ...cityQueries.Query,
    ...busRouteQueries.Query,
    ...stationQueries.Query,
  },
}
