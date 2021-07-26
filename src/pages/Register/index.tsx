import { Box, Grid } from '@material-ui/core'
import React from 'react'
import { createControlsData } from '../../common/create-form-control-data.function'
import CustomForm from '../../components/CustomForm'
import { FormTypes, IFormControl } from '../../components/CustomForm/FormRow'
// import { FormTypes } from '../../types/enums/form-types.enum'
// import { IFormControl } from '../../types/interfaces/IFormControl'

interface RegisterProps {}
const Register: React.FC<RegisterProps> = () => {
  const controls: IFormControl[] = [
    createControlsData('first_name', FormTypes.TEXT, 'First Name', 'Your first name'),
    createControlsData('last_name', FormTypes.TEXT, 'Last Name', 'Your last name'),
    createControlsData('email', FormTypes.EMAIL, 'Email', 'Your email name'),
    createControlsData(
      'password',
      FormTypes.PASSWORD,
      'Password',
      'Your password',
      [],
      [
        {
          description: '',
          info: 'Password must have 8 letter 1 capital letter, 1 alphanumeric, 1 letter',
          error: 'You must follow the rules!',
          passed: false,
          value: `(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9].*[0-9])(?=.*[^a-zA-Z0-9]).{8,}`
        }
      ]
    ),
    createControlsData(
      'password_confirm',
      FormTypes.PASSWORD,
      'Confirm password',
      'Confirm your password'
    ),
    createControlsData('role_id', FormTypes.HIDDEN, 'role_id'),
    createControlsData('teste', FormTypes.TEXT, 'Isso é um teste', 'apenas testando'),
    createControlsData('areYouFoul', FormTypes.SELECT, 'Você é bobo?', '', [
      { title: 'Selecione uma opção', checked: false, value: '' },
      { title: 'Sim', checked: false, value: 'yes' },
      { title: 'Não', checked: false, value: 'no' }
    ]),
    createControlsData('checkPaymentPreferences', FormTypes.CHECKBOX, 'Payment preferences', '', [
      { title: 'installment', checked: true, value: 'installment' },
      { title: 'credit card', checked: true, value: 'creditCard' },
      { title: 'debit card', checked: false, value: 'debitCard' }
    ])
    // createControlsData('types', FormTypes.SELECT, 'Type?', '', [
    //   { title: 'Specialist', checked: false, value: 'specialist' },
    //   { title: 'Joiner', checked: false, value: 'joiner' },
    //   { title: 'Customer', checked: false, value: 'customer' },
    //   { title: 'Agent', checked: true, value: 'agent' }
    // ])
  ]

  const postUrl = 'localhost:8000/register'

  return (
    <>
      <Box style={{ padding: `2rem 0rem` }}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <CustomForm
              variant="outlined"
              formControls={controls}
              postUrl={postUrl}
              header="Cadastro"
              submitButtonText="Enviar"
              resetButtonText="Resetar"
              googleLogin
              googleButtonText="login com o google"
              test
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
export default Register
