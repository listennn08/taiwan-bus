import { BrowserView } from 'react-device-detect'
import { wrapper } from '@/store'
import Background from '@/components/layouts/Background'
import SearchPanel from '@/components/SearchPanel'
import SearchResult from '@/components/SearchResult'
import { setCities } from '@/store/search/action'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [context, setContext] = useState<JSX.Element>() 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setContext(
        <>
          <BrowserView className="md:flex-1">
            <SearchResult />
          </BrowserView>
        </>
      )
    }
  }, [])
  
  return (
    <div className="h-full">
      <div className="h-full home relative overflow-y-hidden">
        <Background />
        <div className="relative z-1 flex pt-15 h-full">
          <div className="h-full w-full md:w-auto">
            <h2 className="text-white text-[2.5rem] mb-7.5 md:text-center font-bold">
              <span className="invisible md:visible">\</span> 
              全台公車一次找
              <span className="invisible md:visible">/</span>
            </h2>
            <SearchPanel />
          </div>
          {context}
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

export default Home
