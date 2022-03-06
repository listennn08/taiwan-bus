import { ReactChild } from 'react'

interface IProps {
  title: string
  children: ReactChild
}
const BaseInfoCard = ({ title, children }: IProps) => {
  return (
    <div className="rounded-2xl bg-white w-card-1/3 mx-2.5">
      <div className="text-blue-800 py-2.5 px-5 bg-green-300 rounded-t-2xl">
        {title}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  )
}

export default BaseInfoCard