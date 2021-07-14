import { Box, Grid } from '@material-ui/core'
import React from 'react'
import { createControlsData } from '../../common/create-form-control-data.function'
import CustomForm from '../../components/CustomForm'
import { FormTypes } from '../../types/enums/form-types.enum'
import { IFormControl } from '../../types/interfaces/IFormControl'

interface RegisterProps {}
const Register: React.FC<RegisterProps> = () => {
  const controls: IFormControl[] = [
    createControlsData('firstName', FormTypes.TEXT, 'First Name', 'Your first name'),
    createControlsData('lastName', FormTypes.TEXT, 'Last Name', 'Your last name'),
    createControlsData('email', FormTypes.EMAIL, 'Email', 'Your email name'),
    createControlsData('password', FormTypes.PASSWORD, 'Password', 'Your password'),
    createControlsData(
      'confirmPassword',
      FormTypes.PASSWORD,
      'Confirm password',
      'Confirm your password'
    ),
    createControlsData('checkPaymentPreferences', FormTypes.CHECKBOX, 'Payment preferences', '', [
      { title: 'installment', checked: false, value: 'installment' },
      { title: 'credit card', checked: false, value: 'creditCard' },
      { title: 'debit card', checked: false, value: 'debitCard' }
    ]),
    createControlsData('types', FormTypes.SELECT, 'Type?', '', [
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
    </>
  )
}
export default Register
