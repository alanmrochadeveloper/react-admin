import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

interface FooterProps {}
const Footer: React.FC<FooterProps> = () => {
  return (
    <footer style={{ textAlign: 'center' }}>
      <AppBar position="static" color="primary">
        <Container maxWidth="md">
          <Toolbar>
            <Box>
              <Typography variant="body1" color="inherit">
                © {new Date().getFullYear()} Alan Miguel
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </footer>
  )
}
export default Footer
