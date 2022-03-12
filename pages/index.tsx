import type { NextPage } from 'next'
import { wrapper } from '@/store'
import Background from '@/components/layouts/Background'
import SearchPanel from '@/components/SearchPanel'
import SearchResult from '@/components/SearchResult'
import { setCities } from '@/store/search/action'
import { BrowserView } from 'react-device-detect'

const Home: NextPage = () => {

  const [context, setContext] = useState<JSX.Element>() 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setContext(<>
        <SearchPanel />
        <BrowserView className="md:flex-1">
          <SearchResult />
        </BrowserView>
      </>)
    }
  }, [])
  return (
    <div className="h-full">
      <div className="h-full home relative overflow-y-hidden">
        <Background />
        <div className="relative z-1 flex pt-15 h-full">
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
