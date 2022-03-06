import { getBusStopOfRoute, getEstimatedTimeOfArrival, getRouteByCity, getRouteByRouteName } from '../../services'
import { from, map, mergeMap } from 'rxjs'
// import { cityGet } from './../services/core/cityCore'
import { city } from '../../data/city'
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'route-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

interface IRouteQueries {
  routesByCity: (parent: undefined, args: { city: string, keyword?: string }) => Promise<IBusRoute[]|[]>
  allRouteByKeyword: (parent: undefined, args: { keyword: string }) => any
  particularRoute: (parent: undefined, args: { city: string, routeName: string }) => Promise<IBusRoute[]|[]>
  particularStopOfRoute: (parant: undefined, args: {
    city: string, routeName: string, routeUID: string
  }) => Promise<any>
}

export const routeQueries: IRouteQueries = {
  // 取得城市路線
  async routesByCity(_parent, _args) {
    const { city, keyword } = _args
    let filter
    if (keyword) {
      filter = `contains(RouteName/Zh_tw, '${keyword}')` 
    }

    try {
      const resp  = (await getRouteByCity({ 
        city,
        filter
      })).data
      return resp
    } catch (e) {
      console.log(e)
      return []
    }
  },

  async allRouteByKeyword(_parant, _args) {
    const { keyword } = _args

    const return$ = from(city).pipe(
      map((x) => {
        let filter
        if (keyword) {
          filter = `contains(RouteName/Zh_tw, '${keyword}')`
        }

        return { 
          city: x.City,
          filter,
        }
      }),
      mergeMap(getRouteByCity)
    )

    const resp: IBusRoute[] = []
    try {
      await return$.forEach(({ data }) => {
        resp.push(...data)
      })

      return resp
    } catch (e) {
      console.log(e)
      return []
    }
  },

  // 取得特定路線
  async particularRoute(_parent: undefined, _args: { city: string, routeName: string }) {
    const { city, routeName } = _args
    try {
      const resp = (await getRouteByRouteName({ city, routeName })).data
      return resp
    } catch (e) {
      console.log(e)
      return []
    }
  },

  // 取得特定路線站序
  async particularStopOfRoute(_parent: undefined, _args: { city: string, routeName: string, routeUID: string }) {
    const { city, routeName, routeUID } = _args
    const resp = (await getBusStopOfRoute({ 
      city,
      routeName,
      filter: `RouteUID eq '${ routeUID}'`,
    })).data
    const estimatedTimeResp = (await getEstimatedTimeOfArrival({
      city,
      routeName,
      filter: `RouteUID eq '${routeUID}'`,
    })).data

    logger.info(estimatedTimeResp)
    for (let i = 0; i < resp.length; i += 1) {
      for (let j = 0; j < estimatedTimeResp.length; j += 1) {
        if (resp[i].Direction === estimatedTimeResp[j].Direction) {
          const busStops = resp[i].Stops
          resp[i].Stops = busStops.map((el) => {
            if (el.StopUID  === estimatedTimeResp[j].StopUID) {
              return {
                ...el,
                TimeInfo: estimatedTimeResp[j]
              }
            }
            return el
          })
        }
      }
    }

    return resp
  },
}
