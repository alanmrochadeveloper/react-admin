import { Box } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import React from 'react'
import CustomForm from '../../components/CustomForm'
import { FormTypes, RequestType } from '../../components/CustomForm/types/enums/FormTypes'
import { IAxiosRequest, IFormControl, IOption } from '../../components/CustomForm/types/interfaces'
import { createControlsData } from '../../components/CustomForm/Utils/CreateFormControl'
import DashboardWrapper from '../../components/DashboardWrapper'
import { Role } from '../../models/role'

const axiosRequest: IAxiosRequest = {
  url: '/users',
  requestType: RequestType.POST
}

interface CreateUserProps {}
const CreateUser: React.FC<CreateUserProps> = () => {
  // eslint-disable-next-line prefer-const
  const [roleOptions, setRoleOptions] = React.useState<IOption[]>([])
  const [controls, setControls] = React.useState<IFormControl[]>([])
  const [roles, setRoles] = React.useState<Role[]>([])

  React.useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get('roles?take=1000')
        setRoles(data.data)
      } catch (error) {
        console.log(`
          error = ${JSON.stringify(error)}
        `)
      }
    })()
  }, [])

  React.useEffect(() => {
    if (roles.length > 0) {
      setRoleOptions(
        roles.map(role => {
          return { title: role.name, checked: false, value: role.id }
        })
      )
    }
  }, [roles])

  React.useEffect(() => {
    if (roleOptions.length > 0) {
      setControls([
        createControlsData('first_name', FormTypes.TEXT, 'First Name', 'Your first name'),
        createControlsData('last_name', FormTypes.TEXT, 'Last Name', 'Your last name'),
        createControlsData('email', FormTypes.TEXT, 'Email', 'Your email'),
        createControlsData('role_id', FormTypes.SELECT, 'Role', 'SELECIONE', '', [
          { title: 'SELECIONE', checked: false, value: '' },
          ...roleOptions
        ])
      ])
    }
  }, [roleOptions])

  return (
    <DashboardWrapper>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          {controls.length > 0 && roleOptions.length > 0 ? (
            <CustomForm
              formControls={controls}
              axiosRequest={axiosRequest}
              header="Create User"
              redirectUrl="/users"
              variant="outlined"
              submitButtonText="Create"
              test
            />
          ) : (
            <Box>Loading...</Box>
          )}
        </Grid>
      </Grid>
    </DashboardWrapper>
  )
}
export default CreateUser
