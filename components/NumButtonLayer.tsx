import { MouseEvent } from 'react'

interface IProps {
  show: boolean
  onClick?: (e: MouseEvent) => void
}

const NumButtonLayer = ({ show, onClick }: IProps) => {
  return (
    <div className={`
      fixed inset-x-0 bg-primary backdrop-blur-[30px] shadow-md transition-all py-2.5 px-2 flex flex-wrap rounded-t-[20px] z-99
      ${show ? 'bottom-0' : '-bottom-100'}
    `}>
      {Array.from({ length: 9 }).map((_, i) => 
        <button 
          key={`num-${i}`}
          className="bg-light text-secondary mx-3 my-2.5 w-[calc(33%-24px)] py-3 rounded-lg"
          data-num={i + 1}
          onClick={onClick}
        >
          {i + 1}
        </button>
      )}
      <button 
        className="bg-light text-secondary mx-3 my-2.5 w-[calc(50%-24px)] py-3 rounded-lg"
        onClick={onClick}
        data-num={0}
      >
        0
      </button>
      <button 
        className="bg-light text-secondary mx-3 my-2.5 w-[calc(50%-24px)] py-3 rounded-lg"
        onClick={onClick}
      >
        清除
      </button>
    </div>
  )
}

export default NumButtonLayer