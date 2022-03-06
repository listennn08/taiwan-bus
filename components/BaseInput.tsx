import { MouseEvent, ChangeEvent, FocusEvent, ForwardedRef, forwardRef } from 'react'
import NumButtonLayer from './NumButtonLayer'

interface IProps {
  value: string
  placeholder?: string
  className?: string
  type?: string
  show?: boolean
  onNumClick?: (e: MouseEvent) => void
  onChange?: (e: ChangeEvent) => void
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
}

const BaseInput = ({ value, placeholder, className, type, show, onNumClick, onChange, onFocus, onBlur }: IProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref}>
      <input
        placeholder={placeholder}
        value={value}
        className={`
          ${className}
          placeholder-gray-400
          border border-transparent
          px-5 py-4.5
          text-gray-700
          focus:(outline-none border-primary)
          rounded-xl
          transition-colors
          shadow-md
        `}
        
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {type === 'num' && <NumButtonLayer show={show!} onClick={onNumClick} />}
    </div>
  )
}

export default forwardRef<HTMLDivElement, IProps>(BaseInput)