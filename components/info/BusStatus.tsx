import { MouseEvent } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import BaseArrivalLabel from './BaseArrivalLabel'
import { isMobile as detectMobile } from 'react-device-detect'
import { RefreshIcon, XIcon } from '@heroicons/react/solid'
import LocateIcon from '@/assets/icons/locate.svg'
import { timeConverter } from '@/utils'

const StopStatus = [
  '尚未發車',
  '交管不停靠',
  '末班車已過',
  '今日未營運'
]

const arriveDisplay = (stop?: IStop) => {
  if (stop?.TimeInfo?.StopStatus !== 0) {
    const status =  (stop?.TimeInfo?.StopStatus || 4) - 1
    const  text = StopStatus[status] || ''
    return <BaseArrivalLabel text={text} type="bg-gray-300" />
  }

  if (typeof stop?.TimeInfo?.EstimateTime === 'number') {
    const time = timeConverter(stop?.TimeInfo?.EstimateTime)!
    if(time < 5) {
      if (time > 1) {
        return <BaseArrivalLabel text="即將進站" type="bg-warning" />
      }
      return  <BaseArrivalLabel text='進站中' type="bg-danger" />
    }
    return <BaseArrivalLabel text={`${time} 分`} type="bg-success" />
  }

  if (stop?.TimeInfo?.NextBusTime) {
    const text = Intl.DateTimeFormat('zh-tw', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(stop?.TimeInfo?.NextBusTime!))

    return <BaseArrivalLabel text={text} type="bg-success" />
  }
}

interface IProps {
  route?: IBusRoute,
  routeInfo: IBusStopOfRoute[],
  shape: IBusShape[]
  refresh: () => void
}

const BusStatus = ({ route, routeInfo, shape, refresh }: IProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(0)
  const [hoverStopId, setHoverStopId] = useState('')
  const [currentStopId, setCurrentStopId] = useState('')
  const [Map, setMap] = useState<any>()
  const [mapPopup, setMapPopup] = useState(false)

  const handleDirectionClick = (e: MouseEvent) => {
    e.preventDefault()
    const element = e.target as HTMLLIElement

    if (element.dataset.value || element.closest('a')?.dataset.value) {
      setDirection(parseInt(element.dataset.value || element.closest('a')?.dataset.value!))
    }
  }

  const handleMouseEnter = (e: MouseEvent, id: string) => {
    if (!isMobile)  setHoverStopId(id)
    const el = e.target as HTMLLIElement
    el.classList.add('is-hover')
  }

  const handleMouseLeave = (e: MouseEvent) => {
    if (!isMobile)  setHoverStopId('')
    const el = e.target as HTMLLIElement
    el.classList.remove('is-hover')
  }

  const goToStop = (e: MouseEvent, id: string) => {
    e.preventDefault()
    setCurrentStopId(id)
  }

  useEffect(() => {
    setIsBrowser(!detectMobile)
    setIsMobile(detectMobile)
    
    setMap(dynamic(import('./BusMap'), {
      ssr: false,
      loading: () => (
        <div className="h-full flex items-center justify-center">
          <p className="text-2xl">Loading map...</p>
        </div>)
    }))
  }, [])

  return (
    <>
      <div className="hidden md:block mb-5 text-secondary text-2xl font-medium">
        公車動態
      </div>
      <section className="relative">
        <ul className="tabs">
          <li
            key={`tab`}
            className={`tabs-item ${direction === 0 ? 'active' : ''}`}
          >
            <a href="#" onClick={handleDirectionClick} data-value={0} className="rounded-t-2xl">
              <Image
                src="/car.svg"
                width={20}
                height={20}
                alt=""
              />
              <span className="ml-2 whitespace-nowrap">
                往 {route?.DestinationStopNameZh}
              </span>
            </a>
          </li>
          <li
            key={`tab-1`}
            className={`tabs-item ${direction === 1 ? 'active' : ''}`}
          >
            <a href="#" onClick={handleDirectionClick} data-value={1}>
              <Image
                src="/car.svg"
                width={20}
                height={20}
                alt=""
              />
              <span className="ml-2 whitespace-nowrap"> 
                往 {route?.DepartureStopNameZh}
              </span>
            </a>
          </li>
        </ul>
        <div className="
          flex items-start
          p-5
          bg-light 
          overflow-hidden
          md:(bg-white
          min-h-137.5 max-h-137.5
          rounded-r-2xl rounded-b-2xl
          mb-12.5)
        ">
          <ul className="h-[calc(100vh-231px)] overflow-y-scroll w-full pb-18 md:(pb-0 w-1/3 mr-5 px-3 h-127.5)">
            {routeInfo[direction]?.Stops?.map((el) => (
              <li
                key={el.StopUID}
                className="status-item"
                onMouseEnter={($e) => handleMouseEnter($e, el.StopUID!)}
                onMouseLeave={handleMouseLeave}
              >
                {arriveDisplay(el)}
                <div className="ml-4 text-lg">{el.StopName.Zh_tw}</div>
                {hoverStopId === el.StopUID ? <a
                  href="#"
                  onClick={($e) => goToStop($e, el.StopUID)}
                  className="ml-auto bg-[#AFECE4] rounded-full w-8 h-8 flex items-center justify-center text-white"
                  title="查看站牌"
                >
                  →
                </a> : <></>}
              </li>
            ))}
          </ul>
          <div className="hidden md:block w-2/3 h-128 rounded">
            {isBrowser &&
              <Map shape={shape} direction={direction} routeInfo={routeInfo} currentStopId={currentStopId} />}
          </div>
          <div className="
            fixed bottom-0 inset-x-0
            flex md:hidden
            bg-[#26938580]
            rounded-t-[20px]
            p-4
          ">
            <button
              type="button"
              className="py-3 flex-1 rounded-[40px] bg-white text-primary flex items-center justify-center"
              onClick={() => setMapPopup(true)}
            >
              <LocateIcon className="w-5 h-5 mr-2" />
              <span>站牌地圖</span>
            </button>
            <button
              type="button"
              className="
                flex
                w-12
                text-primary
                p-2.5 ml-7.5
                bg-white
                shadow
                rounded-full
                items-center justify-center
                focus:outline-none
              "
            >
              <RefreshIcon className="w-5" onClick={refresh} />
            </button>
          </div>
          <div className={`${mapPopup ? '' : 'hidden'} md:hidden absolute inset-0 bg-[#269385] bg-opacity-50 backdrop-filter backdrop-blur-[50px] p-2.5 z-999 rounded-2xl flex flex-col items-center`}>
            {mapPopup && (
              <div className="w-full h-[calc(100%-100px)] mb-2">
                <Map shape={shape} direction={direction} routeInfo={routeInfo} currentStopId={currentStopId}  className="rounded-2xl" />
              </div>
            )}
            <button
              type="button"
              className="rounded-1 w-10 h-10 bg-secondary text-white p-2"
              onClick={() => setMapPopup(false)}
            >
              <XIcon />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default BusStatus