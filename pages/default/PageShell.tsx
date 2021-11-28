import React from 'react'
import { PageContextProvider } from './usePageContext'
import type { PageContext } from './types'
import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'
import { getCity } from '@/pages/api'
import { setCities, setIsLoading } from '@/store/features/search'
import BaseLoading from '@/components/BaseLoading'
import { RootState } from '@/store'

export { PageShell }

function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode
  pageContext: PageContext
}) {
  const isLoading = useSelector<RootState, boolean>((state) => state.search.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsLoading(true))
    getCity().then((resp) => {
      dispatch(setCities(resp.data.data.cities))
      dispatch(setIsLoading(false))
    })
  }, [])
  
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <>
          <main className="h-main mt-16.5">
          {children}
          <BaseLoading isLoading={isLoading} />
          </main>
          <Footer />
          <Navbar />
        </>
      </PageContextProvider>
    </React.StrictMode>
  )
}