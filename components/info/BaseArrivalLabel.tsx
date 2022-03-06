const BaseArrivalLabel = ({ text, type }: { text: string, type: string }) => (
  <div 
    className={`
      min-w-26
      text-center
      pl-3 pr-5 py-1.5
      rounded-l-md rounded-r-2xl
      ${type}
      text-white tracking-widest text-sm font-normal
    `}
  >
    {text}
  </div>
)

export default BaseArrivalLabel