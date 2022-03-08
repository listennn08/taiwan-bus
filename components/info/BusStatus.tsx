import { ComponentType, MouseEvent } from 'react'
import Image from 'next/image'
import BaseArrivalLabel from './BaseArrivalLabel'
import dynamic from 'next/dynamic'

interface IProps {
  route?: IBusRoute,
  routeInfo: IBusStopOfRoute[],
  shape: IBusShape[]
}

const timeConverter = (t: number) => t ? Math.floor(t / 60) : 0

const StopStatus =[
  '尚未發車',
  '交管不停靠',
  '末班車已過',
  '今日未營運'
]

// const Map = dynamic(
//   import('./BusMap'), 
//   {
//     ssr: false,
//     loading: () => (
//       <div className="h-full flex items-center justify-center">
//         <p className="text-2xl">Loading map...</p>
//       </div>
//     )
//   }
// )

const arriveDisplay = (stop?: IStop) => {
  if (stop?.TimeInfo?.StopStatus !== 0) {
    const  text = StopStatus[stop?.TimeInfo?.StopStatus || 4] || '';
    return (
      <BaseArrivalLabel text={text} type="bg-gray-300" />
    )
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
    return <BaseArrivalLabel text={Intl.DateTimeFormat('zh-tw',{
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(stop?.TimeInfo?.NextBusTime!))} type="bg-success" />
  }
}

const BusStatus = ({ route, routeInfo, shape }: IProps) => {
  const [direction, setDirection] = useState(0)
  const [hoverStopId, setHoverStopId] = useState('')
  const [currentStopId, setCurrentStopId] = useState('')
  const [Map, setMap] = useState<any>()

  const handleDirectionClick = (e: MouseEvent) => {
    e.preventDefault()
    const element = e.target as HTMLLIElement

    if (element.dataset.value || element.closest('a')?.dataset.value) {
      setDirection(parseInt(element.dataset.value || element.closest('a')?.dataset.value!))
    }
  }

  const handleMouseEnter = (e: MouseEvent, id: string) => {
    setHoverStopId(id)
    const el = e.target as HTMLLIElement
    el.classList.add('is-hover')
  }

  const handleMouseLeave = (e: MouseEvent) => {
    setHoverStopId('')
    const el = e.target as HTMLLIElement
    el.classList.remove('is-hover')
  }

  const goToStop = (e: MouseEvent, id: string) => {
    e.preventDefault()
    setCurrentStopId(id)
  }

  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
    
    setMap(dynamic(
      import('./BusMap'), 
      {
        ssr: false,
        loading: () => (
          <div className="h-full flex items-center justify-center">
            <p className="text-2xl">Loading map...</p>
          </div>
        )
      }
    ))
  }, []);

  if (!isBrowser) {
    return null;
  }
  return (
    <>
      <div className="mb-5 text-secondary text-2xl font-medium">
        公車動態
      </div>
      <section>
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
              <span className="ml-2">
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
              <span className="ml-2"> 
                往 {route?.DepartureStopNameZh}
              </span>
            </a>
          </li>
        </ul>
        <div className="
          flex items-start
          p-5
          bg-white
          min-h-137.5 max-h-137.5
          rounded-r-2xl rounded-b-2xl
          overflow-hidden
          mb-12.5
        ">
          <ul className="h-127.5 overflow-y-scroll w-1/3 mr-5 px-3">
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
          <div className="w-2/3 h-128 rounded">
            {isBrowser && <Map shape={shape} direction={direction} routeInfo={routeInfo} currentStopId={currentStopId} />}
          </div>
        </div>
      </section>
    </>
  )
}

export default BusStatus