import { XIcon } from '@heroicons/react/solid'
import IconCheck from '@/assets/icons/check.svg'
import BaseInfoCard from './BaseInfoCard'
import ShareButton from './ShareButton'
import { Dispatch, SetStateAction } from 'react'

const showTime = (start?: string, end?: string) => {
  if (start && end) return `${start} ~ ${end}`

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

interface IProps {
  isOpen: boolean
  cityName?: string
  route?: IBusRoute
  serviceDay: string[]
  operator: TOperatorInfo[]
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const RouteInfo = ({ isOpen, cityName, route, serviceDay, operator, setIsOpen }: IProps) => {
  return (
    <div className={`
      ${isOpen ? '' : 'hidden'}
      fixed inset-0
      bg-secondary backdrop-filter bg-opacity-50 backdrop-blur-[30px]
      z-999
      py-10 px-5
      flex flex-col justify-center
      md:(static block z-auto px-0 py-0 bg-transparent)
    `}>
      <div className="flex items-center mb-5">
        <div className="
          text-white font-medium text-3xl
          md:(text-secondary text-2xl)
        ">
          路線資訊
        </div>
        <div className="md:hidden ml-auto">
        <ShareButton cityName={cityName} route={route} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:-mx-2.5">
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
                      ${serviceDay.includes(key) ? '' : 'hidden'}
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
      <button
        type="button"
        className="md:hidden mx-auto rounded-1 bg-secondary w-11 h-11 p-2 text-white transform -translate-y-5"
        onClick={() => setIsOpen(false)}
      >
        <XIcon />
      </button>
    </div>
  )
}

export default RouteInfo
