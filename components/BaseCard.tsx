import { ReactChild } from 'react'

interface IProps {
  children: ReactChild[]
  text?: string
  onClick: () => void
}

const BaseCard = ({ children, text, onClick }: IProps) => {
  return (
    <div
      onClick={onClick}
      className="
        flex items-center justify-between
        rounded-[14px]
        py-2.5 px-4
        shadow 
        bg-white bg-opacity-80
        mx-2.5 mb-2.5
        w-[calc(50%-2.5rem)]
        cursor-pointer
        hover:(bg-opacity-100)
        transition-all
      "
    >
      <div className="text-secondary font-medium text-2xl mb-2">
        {children[0]}
      </div>
        <div className="text-gray-500 text-right max-w-1/2 relative" title={text}>
          {children[1]}
        <div className="overflow-hidden">
          <div
            className={`
              text-gray-400 text-xs
              block
              overflow-ellipsis
              overflow-hidden
              whitespace-nowrap
              w-full h-4
              ${text?.replace(' - ', '') ? '' : 'hidden'}
            `}>
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BaseCard