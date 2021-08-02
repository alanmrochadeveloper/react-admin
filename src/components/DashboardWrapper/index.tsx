import axios from 'axios'
import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../Header'

interface DashboardWrapperProps {
  children: any
}
const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children }: DashboardWrapperProps) => {
  const [redirect, setRedirect] = React.useState<boolean>(false)
  React.useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get('user')
      } catch (error) {
        setRedirect(true)
      }
    })()
  }, [])

  return (
    <>
      {redirect && <Redirect to="/login" />}
      <Header />
      {children}
    </>
  )
}
export default DashboardWrapper
