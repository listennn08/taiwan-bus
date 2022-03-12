import { ReactChild } from 'react'

interface IProps {
  children: ReactChild
  onClick?: (e?: any) => void
  active: boolean
}

const SelectCard = ({ children, onClick, active }: IProps) => {
  return (
    <div
      className={`selected-card ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default SelectCard