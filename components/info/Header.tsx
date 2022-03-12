import { useRouter } from 'next/router'
import { RefreshIcon, ArrowLeftIcon, DotsHorizontalIcon } from '@heroicons/react/solid'
import ShareButton from './ShareButton'
import { Dispatch, SetStateAction } from 'react'

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
  isOpen: boolean
  time: number
  refresh: () => void
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const InfoHeader = ({ cityName, route, routeInfo, isOpen, time, refresh, setIsOpen }: IProps) => {
  const router = useRouter()

  return (
    <div className="px-2 md:px-0">
      <div className="flex items-center mb-4 md:mb-10">
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
          <span className="hidden md:inline-block mr-2">
            更新時間：{format(routeInfo[0]?.Stops[0].TimeInfo?.UpdateTime)}
          </span>
          {time} 秒後更新
        </div>
      </div>
      <div className="mb-2.5 md:mb-10">
        <div className="flex items-center">
          <h3 className="text-xl md:text-[4rem] text-secondary md:text-primary font-medium">
            {route?.RouteName.Zh_tw}
          </h3>
          <div className="
            text-sm md:text-[1.625rem]
            text-secondary
            ml-3 md:ml-7.5 pl-3 md:pl-7.5
            border-l-2 md:border-gray-300 border-green-700
          ">
            {route?.DepartureStopNameZh} - {route?.DestinationStopNameZh}
          </div>
          <div className="hidden md:block ml-auto">
            <ShareButton cityName={cityName} route={route} />
          </div>
          <button
            className="
              hidden md:flex
              text-primary
              p-2.5 ml-7.5
              bg-white
              shadow
              rounded-full
              items-center
              focus:outline-none
            "
            onClick={refresh}
          >
            <RefreshIcon className="w-5" />
          </button>
          <button
            type="button"
            className="md:hidden ml-auto rounded-1 bg-white text-primary w-11 h-11 p-2" 
            onClick={() => setIsOpen(!isOpen) }
          >
            <DotsHorizontalIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default InfoHeader