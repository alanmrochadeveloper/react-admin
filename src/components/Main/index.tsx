import { Container } from '@material-ui/core'
import React from 'react'

interface MainProps {
  children: React.ReactElement[]
  drawerWidthParent: number
}
const Main: React.FC<MainProps> = ({ drawerWidthParent, children }: MainProps) => {
  return (
    <main style={{ paddingTop: `4rem` }}>
      <Container fixed maxWidth="sm">
        {children}
      </Container>
    </main>
  )
}
export default Main
