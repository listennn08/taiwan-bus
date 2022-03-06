import { useRouter } from 'next/router'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState } from '@/store'
import { setCities, setIsLoading, setResultBusRoutes } from '@/store/search/action'
import { getOperator, getSpecificRouteStop, getRouteShape, getParticularRoute, getRouteSchedule } from '@/pages/api'
import RouteInfo from '@/components/info/RouteInfo'
import InfoHeader from '@/components/info/Header'
import BusStatus from '@/components/info/BusStatus'
import { replaceFromURI } from '@/utils'


interface IProps {
  setIsLoading: typeof setIsLoading
  setCities: typeof setCities
  setResultBusRoutes: typeof setResultBusRoutes
}

const InfoBus = ({ setIsLoading, setCities, setResultBusRoutes }: IProps) => {
  const [cityName, setCityName] = useState('')
  const [route, setRoute] = useState<IBusRoute>()
  const [routeInfo, setRouteInfo] = useState<IBusStopOfRoute[]>([])
  const [operator, setOperator] = useState<TOperatorInfo[]>([])
  const [shape, setShape] = useState<IBusShape[]>([])
  const [schedule, setSchedule] = useState<{ RouteUID: string, ServiceDay: string[] }>({
    RouteUID: '',
    ServiceDay: []
  })

  const router = useRouter()

  const fetchCity = useMemo(() => async () => {
    const { id } = router.query as { id: string }
    if (!id) return
    const [city] = Buffer.from(replaceFromURI(id), 'base64').toString('utf-8').split('_')
    const cities = (await axios.get('https://raw.githubusercontent.com/listennn08/jsonData/master/cities.json'))
      .data.cities as ICity[]
    setCities(cities)
    setCityName(cities.find((el) => el.City === city)?.CityName!)

  }, [router.query, setCities])

  const fetchRoutes = useMemo(() => async () => {
    const { id } = router.query as { id: string }
    if (!id) return
    const [city, routeName, routeUID] = Buffer.from(replaceFromURI(id), 'base64').toString('utf-8').split('_')
    const resp = await getParticularRoute({ city, routeName, routeUID })
    const particularRoutes = resp.data.data.particularRoute as IBusRoute[]
    setResultBusRoutes(resp.data.data.particularRoute)
    setRoute(particularRoutes.find((el) => el.RouteName.Zh_tw === routeName))
  }, [router.query, setResultBusRoutes])

  const fetchBusInfo = useMemo(() => async () => {
    const { id } = router.query as { id: string }
    if (!id) return
    const [city, routeName, routeUID, operatorId] = Buffer.from(replaceFromURI(id), 'base64').toString('utf-8').split('_')
    console.log(city, routeName, routeUID, operatorId)

    const operatorResp = (await getOperator({
      city,
      operatorId
    })).data.data.operator
    setOperator(operatorResp)

    const scheduleResp = (await getRouteSchedule({
      city,
      routeName,
      routeUID,
    })).data.data.schedule

    setSchedule(scheduleResp)
  }, [router.query])

  const fetchData = useMemo(() => async () => {
    const { id } = router.query as { id: string }
    if (!id) return
    const [city, routeName, routeUID] = Buffer.from(replaceFromURI(id), 'base64').toString('utf-8').split('_')
    
    setIsLoading(true)
    const resp = (await getSpecificRouteStop({
      city,
      routeName,
      routeUID
    })).data.data.particularStopOfRoute

    setRouteInfo(resp)

    const shapeResp = (await getRouteShape({
      city,
      routeName,
      routeUID,
    })).data.data.shape

    setShape(shapeResp)
    setIsLoading(false)
  }, [router.query, setIsLoading])

  useEffect(() => { 
    if(router.isReady) {
      fetchCity()
      fetchData()
      fetchRoutes()
      fetchBusInfo()
    } 
  }, [fetchBusInfo, fetchCity, fetchData, fetchRoutes, router.isReady])

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