import debounce from 'lodash.debounce'
import { getRouteByCity, getStations } from '@/pages/api'
import { setKeyword, setIsLoading, setResultBusRoutes, setResultStations } from '@/store/search/action'
import { ISearchReducer } from '@/store/search/reducer'
import { from, map, mergeMap } from 'rxjs'

import type { ChangeEvent } from 'react'
import type { RootState } from '@/store'

async function routesByCity({ city, keyword }: { city: string, keyword: string }) {
  let filter
  if (keyword) {
    filter = `contains(RouteName/Zh_tw, '${keyword}')` 
  }

  try {
    const resp  = (await getRouteByCity({ 
      city,
      filter
    })).data
    return resp
  } catch (e) {
    console.log(e)
    return []
  }
}

async function allRouteByKeyword({ keyword }: { keyword: string }) {
  const cities = (await axios.get('https://raw.githubusercontent.com/listennn08/jsonData/master/cities.json')).data as ICity[]
  const return$ = from(cities).pipe(
    map((x) => {
      let filter
      if (keyword) {
        filter = `contains(RouteName/Zh_tw, '${keyword}')`
      }

      return { 
        city: x.City,
        filter,
      }
    }),
    mergeMap(getRouteByCity)
  )

  const resp: IBusRoute[] = []
  try {
    await return$.forEach(({ data }) => {
      resp.push(...data)
    })

    return resp
  } catch (e) {
    console.log(e)
    return []
  }
}

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
  }

  const handleFocus = () => setShowNumButton(true)
  const handleBlur = () => setShowNumButton(false)

  const fetchResult = useMemo(() => async () => {
    if (!idx) {
      dispatch(setIsLoading(true))
      let resp: IBusRoute[]
      if (currentCity.City) {
        resp = (await routesByCity({
          city: currentCity.City,
          keyword
        }))
      } else {
        resp = (await allRouteByKeyword({ keyword }))
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

  useEffect(() => { search(text) }, [text, search])

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