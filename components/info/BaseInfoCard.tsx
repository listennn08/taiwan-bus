import { ReactChild } from 'react'

interface IProps {
  title: string
  children: ReactChild
}
const BaseInfoCard = ({ title, children }: IProps) => {
  return (
    <div className="info-card">
      <div className="info-card-title">
        {title}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  )
}

export default BaseInfoCard