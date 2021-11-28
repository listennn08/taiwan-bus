import background from '@/assets/home.svg'
import background1 from '@/assets/home-1.svg'
import SearchPanel from './SearchPanel'
import SearchResult from './SearchResult'

const Background = () => (
  <>
    <div
      className="absolute bottom-0 inset-x-0 w-full h-111 bg-cover bg-center z-0"
      style={{ backgroundImage: `url('${background1}')` }}
    />
    <div
      className="absolute bottom-0 inset-x-0 w-full h-83 bg-cover bg-center z-0"
      style={{ backgroundImage: `url('${background}')` }}
    />
  </>
)

const Index = () => {
  return (
    <div className="h-full home relative overflow-y-hidden">
      <Background />
      <div className="relative z-1 flex pt-15 h-full">
        <SearchPanel />
        <SearchResult />
      </div>
    </div>
  )
}

export default Index
