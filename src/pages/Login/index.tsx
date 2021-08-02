import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
// import { createControlsData } from '../../common/create-form-control-data.function'
import CustomForm from '../../components/CustomForm'
import { FormTypes, RequestType } from '../../components/CustomForm/types/enums/FormTypes'
import { IAxiosRequest, IFormControl } from '../../components/CustomForm/types/interfaces'
import { createControlsData } from '../../components/CustomForm/Utils/CreateFormControl'

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const axiosPost: IAxiosRequest = {
    url: 'login',
    requestType: RequestType.POST
  }
  const controls: IFormControl[] = [
    createControlsData('email', FormTypes.TEXT, 'email', 'Your email'),
    createControlsData('password', FormTypes.PASSWORD, 'Password', 'Your password')
  ]

  return (
    <>
      <Box>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <CustomForm
              formControls={controls}
              axiosRequest={axiosPost}
              header="Entrar"
              redirectUrl="/"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
export default Login
