import { Box, Grid } from '@material-ui/core'
import React from 'react'
import CustomForm from '../../components/CustomForm'
import { FormTypes, RequestType } from '../../components/CustomForm/types/enums/FormTypes'
import { IAxiosRequest, IFormControl } from '../../components/CustomForm/types/interfaces'
import { createControlsData } from '../../components/CustomForm/Utils/CreateFormControl'

interface RegisterProps {}
const Register: React.FC<RegisterProps> = () => {
  const initialRoleID = '1207d2d8-4c67-40b6-b8f8-be981b69b2cf'
  const axiosPost: IAxiosRequest = {
    url: 'register',
    requestType: RequestType.POST
  }
  const controls: IFormControl[] = [
    createControlsData('first_name', FormTypes.TEXT, 'First Name', 'Your first name'),
    createControlsData('last_name', FormTypes.TEXT, 'Last Name', 'Your last name'),
    createControlsData('email', FormTypes.EMAIL, 'Email', 'Your email name'),
    createControlsData(
      'password',
      FormTypes.PASSWORD,
      'Password',
      'Your password',
      '',
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
    // createControlsData(
    //   'checkPaymentPreferences',
    //   FormTypes.CHECKBOX,
    //   'Payment preferences',
    //   '',
    //   '',
    //   [
    //     { title: 'installment', checked: true, value: 'installment' },
    //     { title: 'credit card', checked: true, value: 'creditCard' },
    //     { title: 'debit card', checked: false, value: 'debitCard' }
    //   ]
    // ),
    createControlsData('role_id', FormTypes.HIDDEN, 'role_id', '', '', [], [], initialRoleID)
    // createControlsData('teste', FormTypes.TEXT, 'Isso é um teste', 'apenas testando'),
    // createControlsData('areYouFoul', FormTypes.SELECT, 'Você é bobo?', '', [
    //   { title: 'Selecione uma opção', checked: false, value: '' },
    //   { title: 'Sim', checked: false, value: 'yes' },
    //   { title: 'Não', checked: false, value: 'no' }
    // ]),
    // eslint-disable-next-line max-len

    // createControlsData('types', FormTypes.SELECT, 'Type?', '', [
    //   { title: 'Specialist', checked: false, value: 'specialist' },
    //   { title: 'Joiner', checked: false, value: 'joiner' },
    //   { title: 'Customer', checked: false, value: 'customer' },
    //   { title: 'Agent', checked: true, value: 'agent' }
    // ])
  ]

  return (
    <>
      <Box style={{ padding: `2rem 0rem` }}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <CustomForm
              variant="outlined"
              formControls={controls}
              axiosRequest={axiosPost}
              header="Cadastro"
              submitButtonText="Enviar"
              resetButtonText="Resetar"
              googleLogin
              googleButtonText="login com o google"
              test
              redirectUrl="/login"
              backButton
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
export default Register
