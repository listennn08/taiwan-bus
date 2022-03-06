import { useRouter } from 'next/router'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { MobileView, isMobile } from 'react-device-detect'
import SelectCard from './SelectCard'
import TabLayout from './TabLayout'
import { RootState } from '@/store'
import { setCurrentCity, setOtherCity } from '@/store/search/action'
import IconBus from '@/assets/icons/bus.svg'

interface IProps {
  cities: ICity[]
  currentCity: ICity
  otherCity: ICity
  setCurrentCity: typeof setCurrentCity
  setOtherCity: typeof setOtherCity
}

const SearchPanel = ({ cities, currentCity, otherCity, setCurrentCity, setOtherCity } : IProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [displayCount, setDisplayCount] = useState(5)

  const toggleCurrentCity = (v: ICity) => {
    const nullCity = { City: '', CityName: '' }
    if (isMobile) {
      router.push(`/search/${v.City}`)
    } else {
      if (currentCity === v) {
        setCurrentCity(nullCity)
        return
      }

      setOtherCity(nullCity)
      setCurrentCity(v)
    }
  }

  const chooseCity = (v: ICity) => {
    setCurrentCity(v)
    setOtherCity(v)
    setIsOpen(false)
  }

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside (e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Element)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownRef])

  useEffect(() => {
    if (typeof window !== 'undefined')
      setDisplayCount(isMobile ? 5 : 4)
  }, [])

  return (
    <TabLayout>
      <div className="flex flex-wrap -mx-10 md:mx-0">
        {cities.slice(0, displayCount).map((el) => (
          <SelectCard
            key={el.City}
            active={currentCity?.City === el.City}
            onClick={() => toggleCurrentCity(el)}
          >
            <>
              <MobileView>
                <div className="block md:hidden  w-6 h-6 mb-7">
                  <IconBus />
                </div>
                <span className="block md:hidden">{el.CityName.slice(0, 2)}</span>
              </MobileView>
              <span className="hidden md:block">{el.CityName}</span>
            </>
          </SelectCard>
        ))}
        <div className="relative" ref={dropdownRef}>
          <SelectCard
            active={!!(currentCity.City && otherCity.City)}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative w-full">
              <div className="block md:hidden w-6 h-6 mb-7">
                <IconBus />
              </div>
              <div className="flex justify-between md:justify-center">
                <div className={`${otherCity.City ? 'text-xs -translate-y-2/2 text-gray-300' : ''} transform transition-all`}>其他</div>
                <div className={`${otherCity.City ? '-translate-y-2/3' : ''} transform transition-transform`}>{otherCity?.CityName}</div>
                <ChevronDownIcon
                  className={`
                    w-5
                    md:absolute left-1/3 ${otherCity.City ? '-bottom-1/5' : '-bottom-4/5'}
                    ${isOpen ? 'text-primary' : 'text-gray-200'}
                  `}
                />
              </div>
            </div>
          </SelectCard>
          <div className={`dropdown ${isOpen ? '' : 'hidden'}`}>
            {cities.slice(4).map((el) => (
              <button
                key={`btn-${el?.City}`}
                className={`dropdown-button ${otherCity.City === el.City ? 'active': ''}`}
                onClick={() => chooseCity(el)}
              >
                {el?.CityName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </TabLayout>
  )
}

const mapStateToProps = (state: RootState) => ({
  cities: state.search.cities,
  currentCity: state.search.currentCity,
  otherCity: state.search.otherCity,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentCity: bindActionCreators(setCurrentCity, dispatch),
  setOtherCity: bindActionCreators(setOtherCity, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel)
