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
        <link rel="manifest" href="/manifest.json" />
          <meta name="application-name" content="等等公車" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="等等公車" />
          <meta name="description" content="全台公車資訊整合" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#2FC3B1" />

          <link rel="apple-touch-icon" href="/logo.png" />
          <link rel="apple-touch-icon" sizes="192x192" href="icons-192x192.png" />
          <link rel="apple-touch-icon" sizes="256x256" href="icons-256x256.png" />
          <link rel="apple-touch-icon" sizes="384x384" href="icons-384x384.png" />
          <link rel="apple-touch-icon" sizes="512x512" href="icons-512x512.png" />

          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/logo.png" color="transparent" />
          <link rel="shortcut icon" href="/logo.png" />
          <link rel="icon" href="/logo.png" />
              
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://taiwan-bus.netlify.app/" />
          <meta name="twitter:title" content="等等公車" />
          <meta name="twitter:description" content="全台公車資訊整合" />
          <meta name="twitter:image" content="https://taiwan-bus.netlify.app/icon-192x192.png" />
          <meta name="twitter:creator" content="@Matt" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="等等公車" />
          <meta property="og:description" content="全台公車資訊整合" />
          <meta property="og:site_name" content="等等公車" />
          <meta property="og:url" content="https://taiwan-bus.netlify.app/" />
          <meta property="og:image" content="https://taiwan-bus.netlify.app/logo.svg" />
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
