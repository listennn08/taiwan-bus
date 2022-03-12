import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState, wrapper } from '@/store'
import { setCities, setCurrentCity, setIsLoading, setResultBusRoutes } from '@/store/search/action'
import { getOperator, getRouteShape, getRouteByRouteName } from '@/pages/api'
import RouteInfo from '@/components/info/RouteInfo'
import InfoHeader from '@/components/info/Header'
import BusStatus from '@/components/info/BusStatus'
import { replaceFromURI } from '@/utils'
import { generateGeoStringToLatLngArray } from '@/apollo/resolvers/utils'
import { getSchedule,  particularStopOfRoute, useBusInfo } from '@/logic/useBusInfo'

import type { IProps, TSchedule } from '@/logic/useBusInfo'

const InfoBus = (props: IProps) => {
  const {
    cityName,
    route,
    routeInfo,
    operator,
    schedule,
    shape,
    isOpen,
    time,
    setIsOpen,
    refresh,
  } = useBusInfo(props)

  return (
    <div className="
      bg-gradient-to-b from-[#70EBB0] to-[#40CACA] md:bg-light h-full overflow-y-hidden md:overflow-y-scroll md:pb-10
    ">
      <div className="container mx-auto md:px-0 pt-2.5 md:pt-15">
        <InfoHeader cityName={cityName} route={route} routeInfo={routeInfo} time={time} refresh={refresh} isOpen={isOpen} setIsOpen={setIsOpen} />
        <BusStatus route={route} routeInfo={routeInfo} shape={shape} refresh={refresh}/>
        <RouteInfo cityName={cityName} route={route} serviceDay={schedule.ServiceDay} operator={operator} isOpen={isOpen} setIsOpen={setIsOpen}/>
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