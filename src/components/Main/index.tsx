import { Container, useTheme } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

interface MainProps {
  children: React.ReactElement[]
  // drawerWidthParent: number
}
const Main: React.FC<MainProps> = ({ children }: MainProps) => {
  const drawerWidth = 240
  const theme = useTheme()
  const [isDashboard, setIsDashboard] = React.useState<boolean>(false)
  const history = useHistory()

  React.useEffect(() => {
    const { pathname } = history.location
    switch (pathname) {
      case '/':
        // TODO
        console.log(`is home or pathname = ${pathname}`)
        break
      case '/users':
        // TODO
        console.log(`is users or pathname = ${pathname}`)
        break
      default:
        // TODO
        console.log(`default`)
    }
  }, [])
  return (
    <main>
      {isDashboard ? (
        <Container fixed maxWidth="sm">
          {children}
        </Container>
      ) : (
        <div
          style={{
            marginLeft: drawerWidth
          }}
        >
          {' '}
          {children}
        </div>
      )}
    </main>
  )
}
export default Main
