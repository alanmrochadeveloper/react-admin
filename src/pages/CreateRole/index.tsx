import { Box } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import React from 'react'
import CustomForm from '../../components/CustomForm'
import { FormTypes, RequestType } from '../../components/CustomForm/types/enums/FormTypes'
import { IAxiosRequest, IOption, IPermission } from '../../components/CustomForm/types/interfaces'
import { createControlsData } from '../../components/CustomForm/Utils/CreateFormControl'
import DashboardWrapper from '../../components/DashboardWrapper'
import { IFormControl } from '../../types/interfaces/IFormControl'

const axiosRequest: IAxiosRequest = {
  url: '/role',
  requestType: RequestType.POST
}

interface CreateRoleProps {}
const CreateRole: React.FC<CreateRoleProps> = () => {
  // eslint-disable-next-line prefer-const
  const [controls, setControls] = React.useState<IFormControl[]>([])
  const [permissions, setPermissions] = React.useState<IPermission[]>([])

  React.useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios(`permissions`)
        setPermissions(data)
      } catch (error) {
        console.log(`
          error = ${JSON.stringify(error.response)}
        `)
      }
    })()
  }, [])

  React.useEffect(() => {
    if (permissions.length > 0) {
      setControls([
        createControlsData('name', FormTypes.TEXT, 'Role name', 'type role name'),
        createControlsData('ids', FormTypes.CHECKBOX, 'Permissions', '', '', [
          ...permissions.map(perm => {
            return { title: perm.name, checked: false, value: perm.id }
          })
        ])
      ])
    }
  }, [permissions])

  return (
    <DashboardWrapper>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          {controls.length > 0 ? (
            <CustomForm
              formControls={controls}
              axiosRequest={axiosRequest}
              header="Create Role"
              redirectUrl="/roles"
              variant="outlined"
              submitButtonText="Create"
              backButton
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
export default CreateRole
