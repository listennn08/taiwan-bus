import IconCustomLogoFooter from '@/assets/icons/logo-footer.svg'

const Footer = () => {
  return (
    <footer className="hidden md:block bg-gray-600">
      <section className="container mx-auto py-6.25 flex items-center justify-between">
        <IconCustomLogoFooter />
        <span className="text-gray-200 text-sm pointer-events-none">
          全台公車動態時刻查詢應用服務本網站 The F2E所有 Copyright©{new Date().getFullYear()}
        </span>
      </section>
    </footer>
  )
}

export default Footer