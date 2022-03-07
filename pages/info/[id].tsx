import { useRouter } from 'next/router'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState, wrapper } from '@/store'
import { setCities, setCurrentCity, setIsLoading, setResultBusRoutes } from '@/store/search/action'
import { getOperator, getSpecificRouteStop, getRouteShape, getRouteSchedule, getRouteByRouteName, getBusStopOfRoute, getEstimatedTimeOfArrival } from '@/pages/api'
import RouteInfo from '@/components/info/RouteInfo'
import InfoHeader from '@/components/info/Header'
import BusStatus from '@/components/info/BusStatus'
import { replaceFromURI } from '@/utils'
import { generateGeoStringToLatLngArray } from '@/apollo/resolvers/utils'


type fnParams = { city: string, routeName: string, routeUID: string }

async function particularStopOfRoute({ city, routeName, routeUID }: fnParams) {
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

async function getSchedule({ city, routeName, routeUID }: fnParams) {
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

type TSchedule = { RouteUID: string, ServiceDay: string[] }
interface IProps {
  cityName: string
  route: IBusRoute
  routeInfo: IBusStopOfRoute[]
  operator: TOperatorInfo[]
  shape: IBusShape[]
  schedule: TSchedule
  setIsLoading: typeof setIsLoading
  setResultBusRoutes: typeof setResultBusRoutes
}

const InfoBus = (props: IProps) => {
  const { cityName, route, operator, schedule, setIsLoading } = props
  const [routeInfo, setRouteInfo] = useState(props.routeInfo)
  const [shape, setShape] = useState(props.shape)
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


  return (
    <div className="bg-light h-full overflow-y-scroll pb-10">
      <div className="container mx-auto pt-15">
        <InfoHeader cityName={cityName} route={route} routeInfo={routeInfo} fetchData={fetchData} />
        <BusStatus route={route} routeInfo={routeInfo} shape={shape} />
        <RouteInfo route={route} serviceDay={schedule.ServiceDay} operator={operator} />
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps =  wrapper.getStaticProps((store) => async (context) => {
  let cityName = ''
  let isError = false
  let route
  let routeInfo: IBusStopOfRoute[] = []
  let shape: IBusShape[] = []
  let operator: TOperatorInfo[] = []
  let schedule: TSchedule = {
    RouteUID: '',
    ServiceDay: []
  }

  try {
    const id = context.params?.id as string
    const [city, routeName, routeUID, operatorID] = Buffer.from(replaceFromURI(id), 'base64').toString('utf-8').split('_')
    const cities = (await axios.get('https://raw.githubusercontent.com/listennn08/jsonData/master/cities.json'))
      .data.cities as ICity[]
    setCities(cities)(store.dispatch)
    const currentCity = cities.find(({ City  }) => City === city)
    setCurrentCity(currentCity!)(store.dispatch)
    cityName = currentCity?.CityName!

    const particularRoutes = (await getRouteByRouteName({ city, routeName, routeUID })).data as IBusRoute[]
    setResultBusRoutes(particularRoutes)(store.dispatch)
    route = particularRoutes.find((el) => el.RouteName.Zh_tw === routeName)

    routeInfo = (await particularStopOfRoute({ city, routeName, routeUID }))
    
    shape = generateGeoStringToLatLngArray((await getRouteShape({ city, routeName, routeUID })).data)
    
    operator =  (await getOperator({ city, filter: `OperatorID eq '${operatorID}'` })).data

    schedule = (await getSchedule({ city, routeName, routeUID }))

  } catch (e) {
    isError = true
    console.log(e)
  }

  return {
    props: {
      cityName,
      route,
      routeInfo,
      operator,
      shape,
      schedule,
      isError,
    }
  }
})

const mapStateToProps = (state: RootState) => ({
  resultBusRoutes: state.search.resultBusRoutes,
  cities: state.search.cities,
})

const mapDistapchToProps = (dispatch: Dispatch) => ({
  setIsLoading: bindActionCreators(setIsLoading, dispatch),
  setCities: bindActionCreators(setCities, dispatch),
  setResultBusRoutes: bindActionCreators(setResultBusRoutes, dispatch)
})

export default connect(mapStateToProps, mapDistapchToProps)(InfoBus)