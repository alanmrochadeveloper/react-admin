import { Container } from '@material-ui/core'
import React from 'react'

interface MainProps {
  children: React.ReactElement[]
  // drawerWidthParent: number
}
const Main: React.FC<MainProps> = ({ children }: MainProps) => {
  return (
    <main>
      <Container fixed maxWidth="sm">
        {children}
      </Container>
    </main>
  )
}
export default Main
