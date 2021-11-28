import IconLoading from '~icons/custom/loading'

const BaseLoading = ({ isLoading }: { isLoading: boolean }) => (
  <div
    className={`
      fixed inset-0
      ${isLoading ? 'flex' : 'hidden'}
      items-center justify-center
      z-999
    `}
  >
    <div className="w-50 h-50 flex items-center justify-center flex-col bg-secondary bg-opacity-80 rounded-[2.5rem]">
      <IconLoading  className="mb-5"/>
      <span className="text-white pointer-events-none">載入中...請稍等</span>
    </div>
  </div>
)

export default BaseLoading