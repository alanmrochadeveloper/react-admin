import React from 'react'
import Header from '../Header'

interface DashboardWrapperProps {
  children: any
}
const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children }: DashboardWrapperProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
export default DashboardWrapper
