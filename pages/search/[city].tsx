import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
import ArrowLeftIcon from '@heroicons/react/outline/ArrowLeftIcon'
import { wrapper } from '@/store'
import { setCities, setCurrentCity, setResultBusRoutes } from '@/store/search/action'
import { useSearch } from '@/logic/useSearch'
import { useClickOutside } from '@/logic/useClickOutside'
import { getRouteByCity } from '../api'
import BaseInput from '@/components/BaseInput'
import Background from '@/components/layouts/Background'
import SearchResult from '@/components/SearchResult'

import type { MouseEvent, FocusEvent } from 'react'
interface IProps {
  cityName: string
  isError: boolean
}

const Search = ({ cityName, isError }: IProps) => {
  const { text, showNumButton, setText, handleChange, handleFocus, setShowNumButton } = useSearch()
  const router = useRouter()
  const inputEl = useRef<HTMLDivElement>(null)
  const goBack = () => router.back()

  const handleNumClick = (e: MouseEvent) => {
    const el = e.target as HTMLButtonElement
    if (!el.dataset.num && el.dataset.num !== '0') {
      setText('')
    } else {
      setText((v) => `${v}${el.dataset.num}`)
    }
  }
  useClickOutside(inputEl, () => setShowNumButton(false))
  useEffect(() => {
    if (!isMobile) router.replace('/')
  }, [router])

  const onHandleFocus = (e: FocusEvent) => {
    e.preventDefault()
    handleFocus()
  }

  return (
    <div className="h-full home relative overflow-y-hidden">
      <Background />
      <div className="flex items-center px-5 pb-5 rounded-b-[30px] bg-white shadow mb-[30px]">
        <button className="p-2" onClick={goBack}>
          <ArrowLeftIcon className="w-5 text-gray-300" />
        </button>
        <div className="min-w-10 mr-4 text-blue-700">{cityName}</div>
        <BaseInput
          placeholder="搜尋公車號"
          containerClassName="flex-1"
          className="border border-[#C5F1EC] w-full shadow-none py-3 placeholder-gray-300"
          type='num'
          value={text}
          show={showNumButton}
          onNumClick={handleNumClick}
          onChange={handleChange}
          onFocus={onHandleFocus}
          ref={inputEl}
        />
      </div>
      {isError ? <h2 className="text-primary text-xl">Something Wrong... Please retry.</h2> : <SearchResult />}
    </div>
  )
}

export const getStaticPaths = async () => {
  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps =  wrapper.getStaticProps((store) => async (context) => {
  let cityName = ''
  let isError = false
  try {
    const city = context.params?.city as string
    const routes  = (await getRouteByCity({ city })).data
    routes.sort((a, b) => a.RouteName.En?.charCodeAt(0)! - b.RouteName.En?.charCodeAt(0)! )
    setResultBusRoutes(routes)(store.dispatch)
    const cities = (await axios.get('https://raw.githubusercontent.com/listennn08/jsonData/master/cities.json'))
      .data.cities as ICity[]
    setCities(cities)(store.dispatch)
    const currentCity = cities.find(({ City  }) => City === city)
    cityName = currentCity?.CityName?.slice(0, 2)!
    setCurrentCity(currentCity!)(store.dispatch)
  } catch (e) {
    isError = true
    console.log(e)
  }

  return {
    props: {
      cityName,
      isError
    }
  }
})

export default Search