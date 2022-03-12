import { ShareIcon } from '@heroicons/react/solid'

interface IProps {
  cityName?: string
  route?: IBusRoute
}
const ShareButton = ({ cityName, route }: IProps) => {
  const [isCopyTextShow, setIsCopyTextShow] = useState(false)
  const copy = () => {
    const url = location.href
    navigator.clipboard.writeText(`查看等等公車的${cityName} ${route?.RouteName.Zh_tw}公車 即時動態： ${url}`)
    setIsCopyTextShow(true)
  }

  useEffect(() => {
    if (isCopyTextShow) setTimeout(() => setIsCopyTextShow(false), 2000)
  }, [isCopyTextShow])

  return (
    <button
      className="
        flex
        text-primary bg-white
        px-9.5 py-2 ml-auto
        items-center
        rounded-[40px] shadow
        focus:outline-none
        disabled:(bg-gray-300 text-gray-600)
        relative
      "
      onClick={copy}
    >
      <ShareIcon className="w-5 mr-3.5" />
      分享頁面

      <div className={`${isCopyTextShow ? 'show' : ''} copy-text`}>
      \ 太棒了！ 頁面複製成功 /
      </div>
    </button>
  )
}

export default ShareButton