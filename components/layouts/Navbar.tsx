import Link from 'next/link'
import IconLogo from '@/assets/icons/logo.svg'

const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-0">
      <div className="container mx-auto px-2 md:px-0 py-2.5 flex items-center justify-between">
        <h1>
          <Link href="/">
            <a><IconLogo className="transform scale-80 md:scale-100" /></a>
          </Link>
        </h1>
        <span className="mt-1 md:mt-0 text-gray-700 pointer-events-none">全台公車整合資訊網</span>
      </div>
    </div>
  )
}

export default Navbar