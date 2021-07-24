import { Button, Grid, Typography } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import CustomFormRow from '../CustomFormRow'

interface CustomFormProps {
  formControls: IFormControl[]
  postUrl: string
  header?: string
  submitButtonText?: string
  resetButtonText?: string
  googleButtonText?: string
  facebookButtonText?: string
  githubButtonText?: string
  googleLogin?: boolean
  facebookLogin?: boolean
  githubLogin?: boolean
}
const CustomForm: React.FC<CustomFormProps> = ({
  formControls,
  postUrl,
  header = 'Form',
  submitButtonText = 'Submit',
  resetButtonText = 'Reset',
  googleButtonText = 'Login with google',
  facebookButtonText = 'Login with facebook',
  githubButtonText = 'Login with github',
  googleLogin = true,
  facebookLogin = false,
  githubLogin = false
}: CustomFormProps) => {
  const [parentState, setParentState] = React.useState<any>({})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> | undefined) => {
    event?.preventDefault()
    const data = await axios.post(postUrl, parentState)
    console.log(`data from request = ${data}`)
    console.log('form submitted, parent state = ', parentState)
  }

  return (
    <>
      <Grid container>
        <form onSubmit={handleSubmit} style={{ margin: '1rem' }}>
          <Grid item>
            <Typography variant="h4" align="center">
              {header}
            </Typography>
          </Grid>
          {formControls.length > 0 &&
            formControls.map((form: IFormControl, index: number) => (
              <Grid item key={form.label}>
                {' '}
                <CustomFormRow
                  {...form}
                  index={index}
                  setParentState={setParentState}
                  parentState={parentState}
                />
              </Grid>
            ))}
          <Grid item container justifyContent="space-evenly">
            <Grid item>
              <Button type="submit" variant="outlined" color="primary">
                {submitButtonText}
              </Button>
            </Grid>
            <Grid item>
              <Button type="reset" variant="outlined">
                {resetButtonText}
              </Button>
            </Grid>
          </Grid>
          {googleLogin ? (
            <Grid
              container
              item
              justifyContent="space-evenly"
              style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
            >
              <Grid item>
                <Button variant="outlined" color="secondary">
                  {googleButtonText}
                </Button>
              </Grid>
            </Grid>
          ) : null}
          {facebookLogin ? (
            <Grid
              container
              item
              justifyContent="space-evenly"
              style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
            >
              <Grid item>
                <Button variant="outlined" color="secondary">
                  {facebookButtonText}
                </Button>
              </Grid>
            </Grid>
          ) : null}
          {githubLogin ? (
            <Grid
              container
              item
              justifyContent="space-evenly"
              style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
            >
              <Grid item>
                <Button variant="outlined" color="secondary">
                  {githubButtonText}
                </Button>
              </Grid>
            </Grid>
          ) : null}
        </form>
      </Grid>
    </>
  )
}
export default CustomForm

interface IFormControl {
  name: string
  type: FormTypes
  label: string
  placeholder: string
  variant?: 'outlined' | 'standard' | 'filled' | undefined
  value?: string
  options?: IOption[]
  regexes?: IRegex[]
  hiddenConstValue?: string
}

interface IOption {
  title?: string
  checked?: boolean
  value?: string
}

interface IRegex {
  description?: string
  info?: string
  warn?: string
  error?: string
  passed: boolean
  value: any
}

enum FormTypes {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  HIDDEN = 'hidden'
}
