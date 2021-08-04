import { Box } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import React from 'react'
import CustomForm from '../../components/CustomForm'
import { FormTypes, RequestType } from '../../components/CustomForm/types/enums/FormTypes'
import { IFormControl, IOption } from '../../components/CustomForm/types/interfaces'
import { createControlsData } from '../../components/CustomForm/Utils/CreateFormControl'
import DashboardWrapper from '../../components/DashboardWrapper'
import { Permission } from '../../models/permission'
import { Role } from '../../models/role'

interface EditRoleProps {
  match: any
}
const EditRole: React.FC<EditRoleProps> = ({ match }: EditRoleProps) => {
  const pathId = match.params.id

  const [role, setRole] = React.useState<Role>(new Role())
  const [permissions, setPermissons] = React.useState<Permission[]>([])
  const [controls, setControls] = React.useState<IFormControl[]>([])

  React.useEffect(() => {
    ;(async () => {
      console.log(`id for param =  ${pathId}`)
      try {
        let { data } = await axios(`role/${pathId}`)
        console.log(`id for param =  ${pathId}, data = ${JSON.stringify(data)}`)
        setRole(data)

        data = await axios(`permissions`)
        console.log(`permissions data = ${JSON.stringify(data.data)}`)
        setPermissons(data.data)
      } catch (error) {
        console.log(`error = ${JSON.stringify(error.response)}`)
      }
    })()
  }, [])

  React.useEffect(() => {
    console.log(`role = ${JSON.stringify(role)}`)
    if (role.id.length > 0 && permissions.length > 0) {
      setControls([
        createControlsData('name', FormTypes.TEXT, 'Name', '', role?.name),
        createControlsData(
          'ids',
          FormTypes.CHECKBOX,
          'permissions',
          '',
          '',
          permissions.map(perm => {
            return {
              title: perm.name,
              checked: role.permissions.some(p => p.id === perm.id),
              value: perm.id
            }
          })
        )
      ])
    }
  }, [role, permissions])

  return (
    <DashboardWrapper>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          {controls.length > 0 ? (
            <CustomForm
              axiosRequest={{ url: `role/${pathId}`, requestType: RequestType.PUT }}
              formControls={controls}
              backButton
              submitButtonText="Save"
              redirectUrl="/roles"
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
export default EditRole
