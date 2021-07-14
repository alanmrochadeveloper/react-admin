import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { createControlsData } from '../../common/create-form-control-data.function'
import CustomForm from '../../components/CustomForm'
import { FormTypes } from '../../types/enums/form-types.enum'
import { IFormControl } from '../../types/interfaces/IFormControl'

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const controls: IFormControl[] = [
    createControlsData('username', FormTypes.TEXT, 'Username', 'Your Username', null),
    createControlsData('password', FormTypes.PASSWORD, 'Password', 'Your password', null)
  ]
  return (
    <>
      <Box>
        <Typography variant="h4">Login</Typography>
        <Box>
          <CustomForm formControls={controls} />
        </Box>
      </Box>
    </>
  )
}
export default Login
