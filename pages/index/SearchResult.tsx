import { navigate } from 'vite-plugin-ssr/client/router'
import BaseCard from '@/components/BaseCard'
import { RootState } from '@/store'
import { ISearchSlice } from '@/store/features/search'

const SearchResult = () => {
  const {
    idx,
    currentCity,
    resultBusRoutes,
    resultBusStation,
  } = useSelector<RootState, ISearchSlice>((state) => state.search)

  const searchType = idx === 0 ? '公車' : idx === 1 ? '站牌' : '客運'
  const showTitle = (resultBusRoutes.length && idx === 0) || (resultBusStation.length && idx === 1)
  return (
    <div className="h-full flex-1 ml-9.5 overflow-y-hidden">
      <p
        className={`
          text-gray-500 leading-4
          ml-2.5 pb-5
          font-medium
          ${showTitle ? '' : 'hidden'}
        `}
      >
        {searchType}搜尋結果
      </p>
      <div className="h-full flex items-start content-start flex-wrap overflow-y-scroll pb-10 scroll:hidden">
        {idx === 0 && resultBusRoutes.map((route) => (
          <BaseCard
            key={route.RouteUID}
            text={`${route.SubRoutes?.[0].FirstBusTime || ''} - ${route.SubRoutes?.[0].LastBusTime || ''}`}
            onClick={() => navigate(encodeURI(`/info/bus/${currentCity.City}/${route.RouteName.Zh_tw}`))}
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

export default SearchResult
