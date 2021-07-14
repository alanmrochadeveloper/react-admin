import { Box, Grid } from '@material-ui/core'
import React from 'react'
import CustomForm from '../../components/CustomForm'
import { FormTypes } from '../../types/enums/form-types.enum'
import { IFormControl } from '../../types/interfaces/IFormControl'
import { IOption } from '../../types/interfaces/IOption'

interface RegisterProps {}
const Register: React.FC<RegisterProps> = () => {
  const createControlsData = (
    name = 'none', // names must be unique
    type = FormTypes.TEXT,
    label = 'text',
    placeholder = 'text here',
    options: IOption[] = []
  ): IFormControl => {
    return { name, type, label, placeholder, options }
  }

  const controls: IFormControl[] = [
    createControlsData('firstName', FormTypes.TEXT, 'First Name 2', 'Your first name here'),
    createControlsData('lastName', FormTypes.TEXT, 'Last Name 2', 'Your last name here'),
    createControlsData('email', FormTypes.EMAIL, 'Email 2', 'Your email name here'),
    createControlsData('password', FormTypes.PASSWORD, 'Password 2', 'Your password here'),
    createControlsData(
      'confirmPassword',
      FormTypes.PASSWORD,
      'maluco 2',
      'Confirm your password here'
    ),
    createControlsData('checkAlgumaCoisa', FormTypes.CHECKBOX, 'doidera check', '', [
      { title: 'check', checked: true, value: '' },
      { title: 'check2', checked: true, value: '' }
    ]),
    createControlsData('Types', FormTypes.SELECT, 'What are you?', '', [
      { title: 'Specialist', checked: false, value: 'specialist' },
      { title: 'Joiner', checked: false, value: 'joiner' },
      { title: 'Customer', checked: false, value: 'customer' }
    ])
  ]

  return (
    <>
      <Box style={{ padding: `2rem 0rem` }}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <CustomForm formControls={controls} />
        </Grid>
      </Box>
      {/* <form style={{ margin: `2rem 0rem` }}>
        <Box>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField variant="outlined" label="First Name" type="text" />
            </Grid>
            <Grid item>
              <TextField variant="outlined" label="Last Name" type="text" />
            </Grid>
            <Grid item>
              <TextField variant="outlined" label="Email" type="email" />
            </Grid>
            <Grid item>
              <TextField variant="outlined" label="Password" type="password" />
            </Grid>
            <Grid item>
              <TextField variant="outlined" label="Confirm Password" type="password" />
            </Grid>
          </Grid>
        </Box>
      </form> */}
    </>
  )
}
export default Register
