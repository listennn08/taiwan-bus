import { NextPage } from 'next'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'
import BaseLoading from '@/components/BaseLoading'
import { RootState } from '@/store'
import { setCities, setIsLoading } from '@/store/search/action'
import { ISearchReducer } from '@/store/search/reducer'


const Layout: NextPage = ({ children }) => {
  const {
    isLoading
  } = useSelector<RootState, ISearchReducer>((state) => state.search)
  // useEffect(() => {
  //   setIsLoading(true)
  //   getCity().then((resp) => {
  //     setCities(resp.data.data.cities)
  //     setIsLoading(false)
  //   })
  // }, [setCities, setIsLoading])

  return (
    <>
      <main className="main mt-15 md:mt-16.5 h-[calc(100vh-60px)] md:h-[calc(100vh-146px)]">
        {children}
        <BaseLoading isLoading={isLoading} />
      </main>
      <Footer />
      <Navbar />
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  isLoading: state.search.isLoading
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setIsLoading: bindActionCreators(setIsLoading, dispatch),
  setCities: bindActionCreators(setCities, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
