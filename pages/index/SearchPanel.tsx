import ArrowDown from '~icons/ic/round-keyboard-arrow-down'
import SelectCard from './SelectCard'
import TabLayout from './TabLayout'
import { RootState } from '@/store'
import { ISearchSlice, setCurrentCity, setOtherCity } from '@/store/features/search'

const SearchPanel = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const {
    cities,
    currentCity,
    otherCity,
  } = useSelector<RootState, ISearchSlice>((state) => state.search)
  
  const toggleCurrentCity = (v: ICity) => {
    const nullCity = { City: '', CityName: '' }
    if (currentCity === v) {
      dispatch(setCurrentCity(nullCity))
      return
    }
    dispatch(setOtherCity(nullCity))
    dispatch(setCurrentCity(v))
  }

  const chooseCity = (v: ICity) => {
    dispatch(setCurrentCity(v))
    dispatch(setOtherCity(v))
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

  return (
    <TabLayout>
      <div className="flex">
        {cities.slice(0, 4).map((el) => (
          <SelectCard
            key={el.City}
            active={currentCity?.City === el.City}
            onClick={() => toggleCurrentCity(el)}
          >
            {el.CityName}
          </SelectCard>
        ))}
        <div className="relative" ref={dropdownRef}>
          <SelectCard
            active={!!(currentCity.City && otherCity.City)}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative w-full">
              <div className={`${otherCity.City ? 'text-xs -translate-y-2/2 text-gray-300' : ''} transform transition-all`}>其他</div>
              <div className={`${otherCity.City ? '-translate-y-2/3' : ''} transform transition-transform`}>{otherCity?.CityName}</div>
              <ArrowDown
                className={`
                  absolute left-1/3 ${otherCity.City ? '-bottom-1/5' : '-bottom-4/5'}
                  ${isOpen ? 'text-primary' : 'text-gray-200'}
                `}
              />
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

export default SearchPanel
