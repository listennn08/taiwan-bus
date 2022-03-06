import { MouseEvent, ReactChild } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import IconBus from '@/assets/icons/bus.svg'
import IconStop from '@/assets/icons/stop.svg'
import IconCar from '@/assets/icons/car.svg'
import { setCurrentCity, setIdx, setIsLoading, setKeyword, setResultBusRoutes, setResultStations } from '@/store/search/action'

import type { RootState } from '@/store'
import BaseInput from './BaseInput'
import { useSearch } from '@/logic/useSearch'

interface IProps {
  idx: number
  keyword: string
  currentCity: ICity
  children: ReactChild
  setCurrentCity: typeof setCurrentCity
  setIdx: typeof setIdx
  setIsLoading: typeof setIsLoading
  setKeyword: typeof setKeyword
  setResultBusRoutes: typeof setResultBusRoutes
  setResultStations: typeof setResultStations
}

const TabLayout = ({ idx, children, setCurrentCity, setIdx, setIsLoading, setKeyword, setResultBusRoutes, setResultStations }: IProps) => {
  const { text, handleChange } = useSearch()
  const placeholder = idx === 0 ? '搜尋公車號碼' : idx === 1 ? '搜尋站牌名稱' : '搜尋客運號碼'

  const tabClick = (e: MouseEvent) => {
    e.preventDefault()
    const element = e.target as HTMLLinkElement
    if (element.dataset.index !== '0') return
    setIdx(parseInt(element.dataset.index!, 10))
    setKeyword('')
    setCurrentCity({ City: '', CityName: ' '})
    setResultBusRoutes([])
    setResultStations([])
  }

  const tabs = [
    {
      text: '找公車',
      icon: <IconBus className="text-secondary mr-2 w-5 h-5" />,
    },
    {
      text: '找站牌',
      icon: <IconStop className="text-secondary mr-2 w-5 h-5"/>,
    },
    {
      text: '找客運',
      icon: <IconCar className="text-secondary mr-2 w-5 h-5"/>,
    }
  ]

  return (
    <div className="h-full w-full md:w-auto">
      <h2 className="text-white text-[2.5rem] mb-7.5 md:text-center font-bold">
        <span className="invisible md:visible">\</span> 全台公車一次找 <span className="invisible md:visible">/</span>
      </h2>
      
      <div className="flex h-full md:items-start">
        <div className="hidden md:flex">
          <div className="lg:pl-30 bg-white bg-opacity-90" />
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
                <h4 className="tab-ask-title">
                  搭乘城市：
                </h4>
                <div className="mb-7.5">
                  {children}
                </div>
              </div>
              <div className={idx === 2 ? 'pb-9' : ''}>
                <h4 className="tab-ask-title">公車號碼：</h4>
                <BaseInput placeholder={placeholder} value={text}  onChange={handleChange} className="min-w-120 w-full"/>
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden h-full w-full">
          <div className="h-full bg-white bg-opacity-90 rounded-tr-[40px] px-8.75 pt-6">
            <div className="text-secondary flex items-center justify-between mb-8.75">
              <span className="text-xl leading-7">找公車</span>
              <svg width="81" height="11" viewBox="0 0 81 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M72.7241 1L79.458 8.32312C80.0475 8.96415 79.5928 10 78.7219 10H1" stroke="#81E1D5" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  idx: state.search.idx,
  keyword: state.search.keyword,
  currentCity: state.search.currentCity,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentCity: bindActionCreators(setCurrentCity, dispatch),
  setIdx: bindActionCreators(setIdx, dispatch),
  setIsLoading: bindActionCreators(setIsLoading, dispatch),
  setKeyword: bindActionCreators(setKeyword, dispatch),
  setResultBusRoutes: bindActionCreators(setResultBusRoutes, dispatch),
  setResultStations: bindActionCreators(setResultStations, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TabLayout)

