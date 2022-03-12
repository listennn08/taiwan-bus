import Link from 'next/link'
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid'
import Background from '@/components/layouts/Background'
import LineArrowIcon from '@/assets/icons/lineArrow.svg'
import BusIcon from '@/assets/icons/bus.svg'
import { RootState, wrapper } from '@/store'
import { ISearchReducer } from '@/store/search/reducer'
import { setCities } from '@/store/search/action'

const City = () => {
  const { cities } = useSelector<RootState, ISearchReducer>((state) => state.search)

  return (
    <div className="h-full">
      <div className="h-full home relative overflow-y-hidden">
        <Background />
        <div className="w-full mt-23 h-[calc(100vh-23px)] bg-white rounded-r-[40px] py-5.5 px-5">
          <div className="flex items-center mb-6.5">
            <Link href="/">
              <a className="text-gray-300">
                <ArrowNarrowLeftIcon className="w-5" />
              </a>
            </Link>
            <span className="ml-2 text-blue-700 text-xl leading-7">縣市總覽</span>
            <LineArrowIcon className="w-1/3 ml-auto" />
          </div>
          <ul className="overflow-y-scroll h-[calc(100%-32px)] scroll:hidden">
            {cities.map((el) => (
              <li key={el.City} className="rounded-[40px] bg-primary mb-3">
                <Link href={`search/${el.City}`}>
                  <a className="flex items-center px-4 py-3 text-white text-xl">
                    <BusIcon className="w-6" />
                    <span className="ml-3 font-medium">{el.CityName}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async (): Promise<any> => {
  try {
    const cities = (await axios.get('https://raw.githubusercontent.com/listennn08/jsonData/master/cities.json'))
      .data.cities as ICity[]
    setCities(cities)(store.dispatch)
  } catch (e) {
    return {
      redirect: {
        destination: "/500",
      },
    }
  }
})

export default City
