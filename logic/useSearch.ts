import { ChangeEvent, FocusEvent,  } from 'react'
import debounce from 'lodash.debounce'
import { getRoutes, getStations } from '@/pages/api'
import { setKeyword, setIsLoading, setResultBusRoutes, setResultStations } from '@/store/search/action'
import { RootState } from '@/store'
import { ISearchReducer } from '@/store/search/reducer'

export const useSearch = () => {
  const [firstLoading, setFirstLoading] = useState(true)
  const [text, setText] = useState('')
  const [showNumButton, setShowNumButton] = useState(false)
  const { idx, currentCity, keyword } = useSelector<RootState, ISearchReducer>((state) => state.search)
  const dispatch = useDispatch()

  const search = useMemo(() => debounce((t: string) => dispatch(setKeyword(t)), 800), [dispatch])

  const handleChange = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement
    setText(element.value)
    search(element.value)
  }

  const handleFocus = (e: FocusEvent) => setShowNumButton(true)
  const handleBlur = (e: FocusEvent) => setShowNumButton(false)

  const fetchResult = useMemo(() => async () => {
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
  }, [currentCity.City, idx, keyword, dispatch])

  useEffect(() => {
    if (!firstLoading) {
      if (currentCity.CityName) {
        fetchResult()
      }
    } else {
      setFirstLoading(false)
    }
  }, [keyword, currentCity.CityName, fetchResult])

  return {
    text,
    keyword,
    currentCity,
    showNumButton,
    setText,
    handleChange,
    handleFocus,
    handleBlur,
    setShowNumButton,
  }
}