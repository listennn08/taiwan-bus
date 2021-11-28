import { PageContextBuiltIn } from 'vite-plugin-ssr'
import { navigate } from 'vite-plugin-ssr/client/router'
import IconBack from '~icons/custom/back'
import IconShare from '~icons/ri/share-circle-fill'
import IconRefresh from '~icons/il/refresh'
import IconCheck from '~icons/custom/check'
import { RootState } from '@/store'
import { ISearchSlice, setIsLoading } from '@/store/features/search'
import { getOperator, getSpecificRoute, getRouteShape, getRoutes, getRouteSchedule } from '@/pages/api'
import BaseInfoCard from '@/components/BaseInfoCard'
import BusStatus from './BusStatus'

export async function onBeforeRender(pageContext: PageContextBuiltIn) {
  const { city, routeName } = pageContext.routeParams
  return {
    pageContext: {
      pageProps: {
        city,
        routeName: encodeURI(routeName)
      }
    }
  }
}

const format = (t?: string) => t 
  ? Intl.DateTimeFormat('zh-tw',{
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date(t))
  : ''

const showTime = (start?: string, end?: string) => {
  if (start && end) {
    return `${start} ~ ${end}`
  }

  return '未提供'
}

const weekTable: { [key: string]: string } = { 
  Sunday: '日',
  Monday: '一',
  Tuesday: '二',
  Wednesday: '三',
  Thursday: '四',
  Friday: '五',
  Saturday: '六'
}

const InfoBus = ({ city, routeName }: { city: string, routeName: string }) => {
  const [time, setTime] = useState<number>()
  const [route, setRoute] = useState<IBusRoute>()
  const [routeInfo, setRouteInfo] = useState<IBusStopOfRoute[]>([])
  const [operator, setOperator] = useState<TOperatorInfo[]>([])
  const [shape, setShape] = useState<IBusShape[]>([])
  const [schedule, setSchedule] = useState<{ RouteUID: string, ServiceDay: string[] }>({
    RouteUID: '',
    ServiceDay: []
  })

  const {
    resultBusRoutes,
    cities
  } = useSelector<RootState, ISearchSlice>((state) => state.search)
  const dispatch = useDispatch()

  const findRoute = async () => {
    const rName = decodeURI(routeName)
    let r = resultBusRoutes.find((el) => el.RouteName.Zh_tw === rName)
    if (r) {
      setRoute(r)
      return
    }
    const resp = (await getRoutes({
      city,
      keyword: rName
    })).data.data.routesByCity
    r = resp.find((el: IBusRoute) => el.RouteName.Zh_tw === rName)

    if (r) setRoute(r)
  }

  const cityName = cities.find((el) => el.City === city)?.CityName
  const fetchData = async () => {
    const rName = decodeURI(routeName)
    if (route) {
      dispatch(setIsLoading(true))
      const { RouteUID } = route
      const resp = (await getSpecificRoute({
        city,
        routeName: rName,
        routeUID: RouteUID
      })).data.data.particularStopOfRoute

      setRouteInfo(resp)

      const shapeResp = (await getRouteShape({
        city,
        routeName: rName,
        routeUID: RouteUID,
      })).data.data.shape

      setShape(shapeResp)
      const operatorResp = (await getOperator({
        city,
        operatorId: route.Operators[0].OperatorID
      })).data.data.operator
      setOperator(operatorResp)

      const scheduleResp = (await getRouteSchedule({
        city,
        routeName: rName,
        routeUID: RouteUID,
      })).data.data.schedule

      setSchedule(scheduleResp)
      dispatch(setIsLoading(false))
    }
  }

  const copy = () => {
    `查看等等公車的${cityName} ${route?.RouteName.Zh_tw}公車 即時動態： https://www.DeDeBus.com/taipei/node-id=226`
  }

  useEffect(() => {
    findRoute()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (time) clearInterval(time)
      fetchData()
      setTime(window.setInterval(() => {
        fetchData()
      }, 30000))
    }
    return () => clearInterval(time)
  }, [route])


  return (
    <div className="bg-light h-full overflow-y-scroll pb-10">
      <div className="container mx-auto pt-15">
        <div className="flex items-center mb-10">
          <button
            className="text-gray-300 flex items-center focus:outline-none"
            onClick={() => navigate('/')}
          >
            <IconBack className="w-4 h-4" />
          </button>
          <div className="text-blue-700 ml-5">
            {cityName} | {route?.RouteName?.Zh_tw} 公車
          </div>
          <div className="ml-auto text-gray-600 text-sm">
            更新時間：{format(routeInfo[0]?.Stops[0].TimeInfo?.UpdateTime)}  30秒後更新
          </div>
        </div>
        <div className="mb-10">
          <div className="flex items-center">
            <h3 className="text-[4rem] text-primary font-medium">{route?.RouteName.Zh_tw}</h3>
            <div className="ml-7.5">
              <div className="text-[1.625rem] pl-7.5 border-l-2 border-gray-300 text-secondary">
              {route?.DepartureStopNameZh} - {route?.DestinationStopNameZh}
              </div>
            </div>
            <button
              className="
                text-primary bg-white
                px-9.5 py-2 ml-auto
                flex items-center
                rounded-[40px] shadow
                focus:outline-none
                disabled:(bg-gray-300 text-gray-600)
              "
              disabled={true}
            >
              <IconShare className="mr-3.5" />
              分享頁面
            </button>
            <button
              className="
                text-primary
                p-2.5 ml-7.5
                bg-white
                shadow
                rounded-full
                flex items-center
                focus:outline-none
              "
              onClick={fetchData}
            >
              <IconRefresh />
            </button>
          </div>
        </div>
        <div className="mb-5 text-secondary text-2xl font-medium">
          公車動態
        </div>
        <BusStatus route={route} routeInfo={routeInfo} shape={shape} />
        <div className="mb-5 text-secondary text-2xl font-medium">
          路線資訊
        </div>
        <div className="flex -mx-2.5">
          <BaseInfoCard title="發車資訊">
            <>
              <div className="text-gray-600 text-lg tracking-wider mb-1.5">
              頭末班車 :
              </div>
              <div className="text-gray-500 mb-5">
                平日：{showTime(route?.SubRoutes?.[0].FirstBusTime, route?.SubRoutes?.[0].LastBusTime)}<br />
                假日：{showTime(route?.SubRoutes?.[0].HolidayFirstBusTime, route?.SubRoutes?.[0].HolidayLastBusTime)}
              </div>
              <div className="text-gray-600 text-lg tracking-wider mb-1.5">
                營運日期 :
              </div>
              <div className="flex">
                {Object.keys(weekTable).map((key, i) => (
                  <div className="border-1 border-green-400 rounded-md mr-3" key={Math.random()}>
                    <div className="bg-green-100 py-1 px-1.5 border-b-1 border-green-400">
                      {weekTable[key]}
                    </div>
                    <div className="py-1 px-1.5 text-red-400">
                      <IconCheck className={`
                        ${schedule.ServiceDay.includes(key) ? '' : 'hidden'}
                      `}/>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </BaseInfoCard>
          <BaseInfoCard title="票價資訊">
            <>
              <div className="text-gray-600 text-lg tracking-wider mb-1.5">
              收費方式 :
              </div>
              <div className="text-gray-500 mb-5">
                {route?.FareBufferZoneDescriptionZh}
                {route?.TicketPriceDescriptionZh}
              </div>
            </>
          </BaseInfoCard>
          <BaseInfoCard title="服務客運">
            <>
              <div className="text-gray-600 text-lg tracking-wider mb-1.5">
              客運業者 :
              </div>
              <div className="text-gray-500 mb-5">
                {operator[0]?.OperatorName.Zh_tw}
              </div>
              <div className="text-gray-600 text-lg tracking-wider mb-1.5">
                聯繫電話
              </div>
              <div className="text-gray-500">
                {operator[0]?.OperatorPhone}
              </div>
            </>
          </BaseInfoCard>
        </div>
      </div>
    </div>
  )
}

export default InfoBus