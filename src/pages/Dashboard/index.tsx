import { Box, Typography } from '@material-ui/core'
import React from 'react'

interface DashboardProps {}
const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Box textAlign="center">
      <Typography paragraph>Dashboard</Typography>
    </Box>
  )
}
export default Dashboard
