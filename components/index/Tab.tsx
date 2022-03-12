import { bindActionCreators  } from 'redux'
import { connect } from 'react-redux'
import IconBus from '@/assets/icons/bus.svg'
import IconStop from '@/assets/icons/stop.svg'
import IconCar from '@/assets/icons/car.svg'
import IconLineArrow from '@/assets/icons/lineArrow.svg'
import { setCurrentCity, setIdx, setKeyword, setResultBusRoutes, setResultStations } from '@/store/search/action'
import { useSearch } from '@/logic/useSearch'
import BaseInput from '../BaseInput'

import type { MouseEvent, ReactChild } from 'react'
import type { Dispatch } from 'redux'
import type { RootState } from '@/store'

interface IProps {
  idx: number
  keyword: string
  currentCity: ICity
  children: ReactChild
  setCurrentCity: typeof setCurrentCity
  setIdx: typeof setIdx
  setKeyword: typeof setKeyword
  setResultBusRoutes: typeof setResultBusRoutes
  setResultStations: typeof setResultStations
}

const Tab = ({ idx, children, setCurrentCity, setIdx, setKeyword, setResultBusRoutes, setResultStations }: IProps) => {
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
    <>
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
              <h4 className="tab-ask-title">搭乘城市：</h4>
              <div className="mb-7.5">{children}</div>
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
            <IconLineArrow className="w-1/3" />
          </div>
          {children}
        </div>
      </div>
    </>
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
  setKeyword: bindActionCreators(setKeyword, dispatch),
  setResultBusRoutes: bindActionCreators(setResultBusRoutes, dispatch),
  setResultStations: bindActionCreators(setResultStations, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tab)