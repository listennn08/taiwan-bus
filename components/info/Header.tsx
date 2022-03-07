import { useRouter } from 'next/router'
import { ShareIcon, RefreshIcon, ArrowLeftIcon } from '@heroicons/react/solid'

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

interface IProps {
  cityName?: string
  route?: IBusRoute
  routeInfo: IBusStopOfRoute[]
  fetchData: () => void
}

const InfoHeader = ({ cityName, route, routeInfo, fetchData }: IProps) => {
  const router = useRouter()
  const [time, setTime] = useState(60)
  const [isCopyTextShow, setIsCopyTextShow] = useState(false)
  const copy = () => {
    const url = location.href
    navigator.clipboard.writeText(`查看等等公車的${cityName} ${route?.RouteName.Zh_tw}公車 即時動態： ${url}`)
    setIsCopyTextShow(true)
  }

  const refresh = () => {
    setTime(60)
    fetchData()
  }

  useEffect(() => {
    if (isCopyTextShow) setTimeout(() => setIsCopyTextShow(false), 2000)
  }, [isCopyTextShow])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (time > 0) {
  //       setTime((v) => v - 5)
  //     } else {
  //       setTime(60)
  //       fetchData()
  //     }
  //   }, 5000)

  //   return () => clearTimeout(timer)
  // }, [time, fetchData])
  return (
    <>
    <div className="flex items-center mb-10">
      <button
        className="text-gray-300 flex items-center focus:outline-none"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="w-4.5" />
      </button>
      <div className="text-blue-700 ml-5">
        {cityName} | {route?.RouteName?.Zh_tw} 公車
      </div>
      <div className="ml-auto text-gray-600 text-sm">
        更新時間：{format(routeInfo[0]?.Stops[0].TimeInfo?.UpdateTime)}  {time} 秒後更新
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
            relative
          "
          onClick={copy}
        >
          <ShareIcon className="w-5 mr-3.5" />
          分享頁面

          <div className={`${isCopyTextShow ? 'show' : ''} copy-text`}>
          \ 太棒了！ 頁面複製成功 /
          </div>
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
          onClick={refresh}
        >
          <RefreshIcon className="w-5" />
        </button>
      </div>
    </div>
    </>
  )
}

export default InfoHeader