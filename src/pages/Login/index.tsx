import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { createControlsData } from '../../common/create-form-control-data.function'
import CustomForm from '../../components/CustomForm'
import { FormTypes, IFormControl } from '../../components/CustomForm/FormRow'

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const controls: IFormControl[] = [
    createControlsData('username', FormTypes.TEXT, 'Username', 'Your Username'),
    createControlsData('password', FormTypes.PASSWORD, 'Password', 'Your password')
  ]

  const postUrl = 'localhost:8000/anything'

  return (
    <>
      <Box>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <CustomForm formControls={controls} postUrl={postUrl} header="Entrar" />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
export default Login
