import IconFooterLogo from '~icons/custom/logo-footer'

const Footer = () => {
  return (
    <footer className="bg-gray-600">
      <section className="container mx-auto py-6.25 flex items-center justify-between">
        <IconFooterLogo />
        <span className="text-gray-200 text-sm">
          全台公車動態時刻查詢應用服務本網站 The F2E所有 Copyright©2021
        </span>
      </section>
    </footer>
  )
}

export default Footer