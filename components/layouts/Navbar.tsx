import IconLogo from '~icons/custom/logo'

const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-0">
      <div className="container mx-auto py-2.5 flex items-center justify-between">
        <h1>
          <IconLogo />
        </h1>
        <span className="text-gray-700">全台公車整合資訊網</span>
      </div>
    </div>
  )
}

export default Navbar