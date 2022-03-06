import IconCheck from '@/assets/icons/check.svg'
import BaseInfoCard from './BaseInfoCard'

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
  route?: IBusRoute
  serviceDay: string[]
  operator: TOperatorInfo[]
}

const RouteInfo = ({ route, serviceDay, operator }: IProps) => {
  return (
    <>
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
    </>
  )
}

export default RouteInfo
