import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import React from 'react'

interface RegisterTestProps {}
const RegisterTest: React.FC<RegisterTestProps> = () => {
  const textFieldVariant = 'outlined'
  const textFieldMargin = '0.5rem'

  const [firstName, setFirstName] = React.useState<string>('')
  const [lastName, setLastName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [confirmPassword, setConfirmPassword] = React.useState<string>('')

  const initialRoleID = '1207d2d8-4c67-40b6-b8f8-be981b69b2cf'

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const data = await axios.post('http://localhost:8000/api/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirm: confirmPassword,
        role_id: initialRoleID
      })
      clearAllFields()
      console.log(data.data)
    } catch (error) {
      if (error.response) {
        console.log(`error response = ${JSON.stringify(error.response)}`)
      }
    }
  }

  const clearAllFields = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  React.useEffect(() => {
    const _getRole = async () => {
      // const response = await axios.get('http://localhost:8000/api/roles')
      // return response
    }
    // console.log(`roles = ${JSON.stringify(_getRole())}`)
  }, [])

  return (
    <>
      <Grid container direction="column" alignItems="center" style={{ margin: '1rem' }}>
        <form onSubmit={handleSubmit}>
          <Grid item>
            <TextField
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
              label="Nome"
              name="first_name"
              variant={textFieldVariant}
              style={{ margin: textFieldMargin }}
            />
          </Grid>
          <Grid item>
            <TextField
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
              label="Sobrenome"
              name="last_name"
              variant={textFieldVariant}
              style={{ margin: textFieldMargin }}
            />
          </Grid>
          <Grid item>
            <TextField
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              name="email"
              variant={textFieldVariant}
              style={{ margin: textFieldMargin }}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Senha"
              name="password"
              variant={textFieldVariant}
              style={{ margin: textFieldMargin }}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              label="Confirme a senha"
              name="confirm_password"
              variant={textFieldVariant}
              style={{ margin: textFieldMargin }}
            />
          </Grid>
          <Grid item>
            <Grid container justifyContent="space-around">
              <Grid item>
                <Button type="submit" variant="outlined">
                  submit
                </Button>
              </Grid>
              <Grid item>
                <Button type="reset" onClick={() => clearAllFields()} variant="outlined">
                  reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  )
}
export default RegisterTest

interface IError {
  response: string
}
