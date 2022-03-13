import { NextPage } from 'next'
import Head from 'next/head'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'
import BaseLoading from '@/components/BaseLoading'
import { RootState } from '@/store'
import { setCities, setIsLoading } from '@/store/search/action'
import { ISearchReducer } from '@/store/search/reducer'


const Layout: NextPage = ({ children }) => {
  const { isLoading } = useSelector<RootState, ISearchReducer>((state) => state.search)

  return (
    <>
      <Head>
        <title>等等公車</title>
        <link rel="icon" href="/logo.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="全台公車資訊整合" />
        <meta property="og:site_name" content="等等公車" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="等等公車"/>
        <meta property="og:description" content="全台公車資訊整合" />
        <meta property="og:image" content="https://listennn-taiwan-bus.herokuapp.com/logo.svg" />
        <meta itemProp="name" content="等等公車" />
        <meta itemProp="description" content="全台公車資訊整合" />
        <meta itemProp="image" content="https://listennn-taiwan-bus.herokuapp.com/logo.svg" />
      </Head>
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
