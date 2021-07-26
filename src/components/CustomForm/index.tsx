import { Button, Grid, Typography } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import CustomFormRow, { FormTypes, IFormControl } from './FormRow'

interface CustomFormProps {
  formControls: IFormControl[]
  postUrl: string
  variant?: 'outlined' | 'standard' | 'filled'
  header?: string
  submitButtonText?: string
  resetButtonText?: string
  googleButtonText?: string
  facebookButtonText?: string
  githubButtonText?: string
  googleLogin?: boolean
  facebookLogin?: boolean
  githubLogin?: boolean
  test?: boolean
}
const CustomForm: React.FC<CustomFormProps> = ({
  formControls,
  postUrl,
  variant = 'outlined',
  header = 'Form',
  submitButtonText = 'Submit',
  resetButtonText = 'Reset',
  googleButtonText = 'Login with google',
  facebookButtonText = 'Login with facebook',
  githubButtonText = 'Login with github',
  googleLogin = false,
  facebookLogin = false,
  githubLogin = false,
  test = false
}: CustomFormProps) => {
  const [parentState, setParentState] = React.useState<any | null | undefined>(null)

  const handleReset = () => {
    setParentState((prevState: any) => {
      let newState: any = { ...prevState }
      for (const prop in prevState) {
        if (typeof prop === 'string') {
          newState = { ...newState, [prop]: '' }
        }
      }
      return { ...prevState, ...newState }
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> | undefined) => {
    event?.preventDefault()
    let data = null
    console.log(`JSON.stringify(parentState) = ${JSON.stringify(parentState)}`)
    console.log(`JSON.parse(parentState) = ${JSON.parse(JSON.stringify(parentState))}`)
    try {
      data = await axios.post(postUrl, parentState)
    } catch (error) {
      console.log(`error = ${JSON.stringify(error)}`)
      if (error) {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        }

        // eslint-disable-next-line guard-for-in
        for (const prop in error) {
          console.log(`${prop} = ${JSON.stringify(error[prop])}`)
        }
      }
    }
    console.log(`data from request = ${JSON.stringify(data?.data)}`)
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
                  variant={variant}
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
              <Button type="reset" variant="outlined" onClick={handleReset}>
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
          {test ? (
            <Grid
              container
              item
              justifyContent="space-evenly"
              style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => console.log(`state = ${JSON.stringify(parentState)}`)}
                >
                  getState
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
