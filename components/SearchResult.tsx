import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { RootState } from '@/store'
import { replaceToURI } from '@/utils'
import BaseCard from '@/components/BaseCard'

interface IProps {
  idx: number
  currentCity: ICity
  resultBusRoutes: IBusRoute[]
  resultBusStation: IBusStation[]
}

const SearchResult = ({ idx, currentCity, resultBusRoutes, resultBusStation }: IProps) => {
  const router = useRouter()

  const searchType = idx === 0 ? '公車' : idx === 1 ? '站牌' : '客運'
  const showTitle = (resultBusRoutes.length && idx === 0) || (resultBusStation.length && idx === 1)

  const generateURL = (city: string, routeName: string, routeUID: string, operatorID: string) => {
    const url = Buffer.from(`${city}_${routeName}_${routeUID}_${operatorID}`).toString('base64')
    return replaceToURI(url)
  }

  return (
    <div className="h-full  md:(pt-0 ml-9.5) overflow-y-hidden">
      <p
        className={`hidden md:block text-gray-500 leading-4 ml-2.5 pb-5 font-medium
          ${showTitle ? '' : 'hidden'}
        `}
      >
        {searchType}搜尋結果
      </p>
      <div className="h-full flex flex-col md:flex-row md:(items-start content-start flex-wrap) overflow-y-scroll  pb-10 scroll:hidden">
        {idx === 0 && resultBusRoutes.map((route) => (
          <BaseCard
            key={route.RouteUID}
            text={`${route.SubRoutes?.[0].FirstBusTime || ''} - ${route.SubRoutes?.[0].LastBusTime || ''}`}
            onClick={() => router.push(encodeURI(`/info/${generateURL(currentCity.City!, route.RouteName.Zh_tw!, route.RouteUID, route.Operators[0].OperatorID)}`))}
          >
            <>{route.RouteName.Zh_tw}</>
            <>{route.DepartureStopNameZh} - {route.DestinationStopNameZh}<br /></>
          </BaseCard>
        ))}
        {idx === 1 && resultBusStation.map((station) => (
          <BaseCard
            onClick={() => {}}
            key={station.StationUID}
            text={station.Stops?.map((el) => el.RouteName?.Zh_tw ).join(', ')}
          >
            <>{station.StationName.Zh_tw}</>
            <>{currentCity.CityName}</>
          </BaseCard>
        ))}
        {idx === 2
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  idx: state.search.idx,
  currentCity: state.search.currentCity,
  resultBusRoutes: state.search.resultBusRoutes,
  resultBusStation: state.search.resultBusStation,
})

export default connect(mapStateToProps)(SearchResult)
