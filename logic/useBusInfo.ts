import { getRouteSchedule, getBusStopOfRoute, getEstimatedTimeOfArrival, getRouteShape } from '@/pages/api'
import { setIsLoading, setResultBusRoutes } from '@/store/search/action'
import { replaceFromURI } from '@/utils'
import { generateGeoStringToLatLngArray } from '@/utils/map'
import { useRouter } from 'next/router'

export type fnParams = { city: string, routeName: string, routeUID: string }

export type TSchedule = { RouteUID: string, ServiceDay: string[] }

export interface IProps {
  cityName: string
  route: IBusRoute
  routeInfo: IBusStopOfRoute[]
  operator: TOperatorInfo[]
  shape: IBusShape[]
  schedule: TSchedule
  setIsLoading: typeof setIsLoading
  setResultBusRoutes: typeof setResultBusRoutes
}

export async function particularStopOfRoute({ city, routeName, routeUID }: fnParams) {
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
}

export async function getSchedule({ city, routeName, routeUID }: fnParams) {
  const resp: IBusSchedule[] = (await getRouteSchedule({
    city,
    routeName,
    filter: `RouteUID eq '${routeUID}'`
  })).data
  
  let ServiceDay: string[] = []
  if (resp[0]?.Frequencys) {
    ServiceDay = Array.from(new Set(resp[0].Frequencys.flatMap((el) => {
      return Object.keys(el.ServiceDay || {}).filter((key) => el.ServiceDay?.[key] === 1)
    })))
  } else if (resp[0]?.Timetables) {
    ServiceDay = Array.from(new Set(resp[0].Timetables.flatMap((el) => {
      return Object.keys(el.ServiceDay || {}).filter((key) => el.ServiceDay?.[key] === 1)
    })))
  }

  return {
    RouteUID: resp[0].RouteUID,
    ServiceDay,
  }
}

const defaultTime = 60

export const useBusInfo = (props: IProps) => {
  const { cityName, route, operator, schedule, setIsLoading } = props
  const [routeInfo, setRouteInfo] = useState(props.routeInfo)
  const [shape, setShape] = useState(props.shape)
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState(defaultTime)
  const router = useRouter()

  const fetchData = useMemo(() => async () => {
    const { id } = router.query as { id: string }
    if (!id) return
    const [city, routeName, routeUID] = Buffer.from(replaceFromURI(id), 'base64').toString('utf-8').split('_')
    
    setIsLoading(true)
    const resp = (await particularStopOfRoute({ city, routeName, routeUID }))

    setRouteInfo(resp)

    const shapeResp = generateGeoStringToLatLngArray((await getRouteShape({ city, routeName, routeUID })).data)

    setShape(shapeResp)
    setIsLoading(false)
  }, [router.query, setIsLoading])

  const refresh = () => {
    setTime(defaultTime)
    fetchData()
  }

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (time > 0) {
  //       setTime((v) => v - 5)
  //     } else {
  //       setTime(defaultTime)
  //       fetchData()
  //     }
  //   }, 5000)

  //   return () => clearTimeout(timer)
  // }, [time, fetchData])

  return {
    cityName,
    route,
    routeInfo,
    operator,
    shape,
    schedule,
    isOpen,
    time,
    setIsOpen,
    refresh,
  }
}