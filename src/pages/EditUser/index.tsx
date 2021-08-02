import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import CustomForm from '../../components/CustomForm'
import { FormTypes, RequestType } from '../../components/CustomForm/types/enums/FormTypes'
import { IAxiosRequest, IFormControl } from '../../components/CustomForm/types/interfaces'
import { createControlsData } from '../../components/CustomForm/Utils/CreateFormControl'
import DashboardWrapper from '../../components/DashboardWrapper'
import { Role } from '../../models/role'
import { User } from '../../models/user'

interface EditUserProps {}
const EditUser: React.FC<EditUserProps> = () => {
  const { id }: { id: string } = useParams()
  let axiosRequest: IAxiosRequest = {
    url: `/users/${id}`,
    requestType: RequestType.PUT
  }
  const [userId, setUserId] = React.useState<string>(id)
  const [user, setUser] = React.useState<User>(new User())
  const [roles, setRoles] = React.useState<Role[]>([])
  const [controls, setControls] = React.useState<IFormControl[]>([])
  const history = useHistory()

  React.useEffect(() => {
    ;(async () => {
      try {
        if (history.location.pathname.includes(id)) {
          axiosRequest = {
            url: `users/${id}`,
            requestType: RequestType.PUT
          }
          setUserId(id)

          const { data } = await axios.get(`users/${id}`)
          setUser(data)

          const roleData = await axios.get('roles?take=1000')
          setRoles(roleData.data.data)
        }
      } catch (error) {
        console.log(`
          error = ${JSON.stringify(error.response)}
        `)
      }
    })()

    return () => {
      console.log(`Edit User Did Unmount`)
      setUserId('')
      setUser(new User())
    }
  }, [])

  React.useEffect(() => {
    const path = history.location.pathname
    if (roles.length > 0 && user?.id === userId && path.includes(path) && roles.length) {
      setControls([
        createControlsData(
          'first_name',
          FormTypes.TEXT,
          'First Name',
          'Your first name',
          user.first_name
        ),
        createControlsData(
          'last_name',
          FormTypes.TEXT,
          'Last Name',
          'Your last name',
          user.last_name
        ),
        createControlsData('email', FormTypes.TEXT, 'Email', 'Your email', user.email),
        createControlsData('role_id', FormTypes.SELECT, 'Role', '', user.role.id, [
          ...roles.map(role => {
            return { title: role.name, checked: user.role.id === role.id, value: role.id }
          })
        ])
      ])
    }
  }, [user, roles])

  return (
    <DashboardWrapper>
      {controls?.length > 0 && user?.email?.length && roles?.length ? (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <CustomForm
              formControls={controls}
              axiosRequest={axiosRequest}
              header="Edit Users"
              redirectUrl="/users"
              variant="outlined"
              submitButtonText="update"
              test
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column" alignItems="center">
          <Grid item>loading...</Grid>
        </Grid>
      )}
    </DashboardWrapper>
  )
}
export default EditUser
