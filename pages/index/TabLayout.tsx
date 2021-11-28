import { ChangeEvent, KeyboardEvent, MouseEvent, ReactChild, } from 'react'
import debounce from 'lodash.debounce'
import IconBus from '~icons/custom/bus'
import IconStop from '~icons/custom/stop'
import IconCar from '~icons/custom/car'
import { ISearchSlice, setCurrentCity, setIdx, setIsLoading, setKeyword, setResultBusRoutes, setResultStations } from '@/store/features/search'
import { RootState } from '@/store'
import { getRoutes, getStations } from '../api'

const TabLayout = ({ children }: { children: ReactChild }) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const { idx, keyword, currentCity } = useSelector<RootState, ISearchSlice>((state) => state.search)
  const placeholder = idx === 0 ? '搜尋公車號碼' : idx === 1 ? '搜尋站牌名稱' : '搜尋客運號碼'

  const tabClick = (e: MouseEvent) => {
    e.preventDefault()
    const element = e.target as HTMLLinkElement
    if (element.dataset.index !== '0') return
    dispatch(setIdx(parseInt(element.dataset.index!, 10)))
    dispatch(setKeyword(''))
    dispatch(setCurrentCity({ City: '', CityName: ' '}))
    dispatch(setResultBusRoutes([]))
    dispatch(setResultStations([]))
  }

  const tabs = [
    {
      text: '找公車',
      icon: <IconBus className="text-secondary w-5 h-5 mr-2"/>,
    },
    {
      text: '找站牌',
      icon: <IconStop className="text-secondary w-5 h-5 mr-2"/>,
    },
    {
      text: '找客運',
      icon: <IconCar className="text-secondary w-5 h-5 mr-2"/>,
    }
  ]

  const search = (t: string) => {
    dispatch(setKeyword(t))
  }

  const handleChange = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement
    setText(element.value)
    debounceSearch(element.value)
  }
  const debounceSearch = useCallback(debounce(search, 800), [])
  const fetchResult = async () => {
    if (!idx) {
      dispatch(setIsLoading(true))
      let resp: IBusRoute[]
      if (currentCity.City) {
        resp = (await getRoutes({
          city: currentCity.City,
          keyword
        })).data.data.routesByCity
      } else {
        resp = (await getRoutes({ keyword })).data.data.allRouteByKeyword
      }
      dispatch(setResultBusRoutes(resp))
    }
    if (idx === 1) {
      if (currentCity.City) {
        const resp = (await getStations({
          city: currentCity.City,
          keyword 
        })).data.data.stationsByKetword
        dispatch(setResultStations(resp))
      }
    }

    dispatch(setIsLoading(false))
  }

  useEffect(() => {
    if (currentCity.CityName, keyword) {
      fetchResult()
    }
  }, [keyword, currentCity])

  return (
    <div>
      <h2 className="text-white text-[2.5rem] mb-7.5 text-center font-bold">
        \ 全台公車一次找 /
      </h2>
      <div className="flex">
        <div className="lg:pl-30 bg-white bg-opacity-90"></div>
        <div>
          <ul className="tabs">
            {tabs.map((el, i) => (
              <li
                key={`tab-${i}`}
                className={`
                  tabs-item next-disabled
                  ${ idx === i ? 'active' : ''}
                  ${i === 0 ? '' : 'disabled'}
                `}
              >
                <a href="#" onClick={tabClick} data-index={i}>
                  {el.icon}
                  {el.text}
                </a>
              </li>
            ))}
          </ul>
          <div className="
            flex flex-col justify-center
            px-10 py-10.5
            bg-white bg-opacity-90
            rounded-r-2xl
            min-h-89
          ">
            <div className={idx === 2 ? 'hidden' : ''}>
              <div className="tab-ask-title">
                搭乘城市：
              </div>
              <div className="mb-7.5">
                {children}
              </div>
            </div>
            <div className={idx === 2 ? 'pb-9' : ''}>
              <div className="tab-ask-title">
                公車號碼：
              </div>
              <div>
                <input
                  placeholder={placeholder}
                  value={text}
                  className="
                    placeholder-gray-400
                    border border-transparent
                    px-5 py-4.5
                    text-gray-700
                    focus:(outline-none border-primary)
                    rounded-xl
                    transition-colors
                    w-full
                    shadow-md
                    min-w-120
                  "
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabLayout

