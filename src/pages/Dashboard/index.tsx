import { Box, Typography } from '@material-ui/core'
import React from 'react'
import DashboardWrapper from '../../components/DashboardWrapper'

interface DashboardProps {}
const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <DashboardWrapper>
      <Box textAlign="center">
        <Typography paragraph>Dashboard</Typography>
      </Box>
    </DashboardWrapper>
  )
}
export default Dashboard
