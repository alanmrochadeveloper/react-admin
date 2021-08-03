import { Button, Grid, IconButton, Typography } from '@material-ui/core'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded'
import axios from 'axios'
import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import CustomFormRow from './FormRow'
import { RequestType } from './types/enums/FormTypes'
import { IAxiosRequest, IFormControl } from './types/interfaces'
// import CustomFormRow, { FormTypes, IFormControl } from './FormRow'

interface CustomFormProps {
  formControls: IFormControl[]
  axiosRequest: IAxiosRequest
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
  backButton?: boolean
  test?: boolean
  redirectUrl?: string
}
const CustomForm: React.FC<CustomFormProps> = ({
  formControls,
  axiosRequest,
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
  test = false,
  redirectUrl = '',
  backButton = false
}: CustomFormProps) => {
  const [parentState, setParentState] = React.useState<any | null | undefined>(null)
  const [isRegistered, setIsRegistered] = React.useState<boolean>(false)
  const history = useHistory()

  const handleGetState = () => {
    console.log(`
      state = ${JSON.stringify(parentState)}
    `)
  }

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
    const { url, config } = axiosRequest
    try {
      switch (axiosRequest.requestType) {
        case RequestType.PATCH:
          data = await axios.patch(url, parentState, config)
          setIsRegistered(true)
          break
        case RequestType.PUT:
          console.log(
            `insider put request, url = ${url}, parentState = ${parentState}, config = ${config}`
          )
          data = await axios.put(url, parentState, config)
          setIsRegistered(true)
          break
        default:
          data = await axios.post(url, parentState, config)
          setIsRegistered(true)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      if (error) {
        if (error?.response) {
          console.log(`error response = ${JSON.stringify(error?.response)}`)
        }
      }
    }
  }
  React.useEffect(() => {
    console.log(`custom form did mount!`)
    setParentState((prevState: any) => {
      let newState: any = { ...prevState }
      // eslint-disable-next-line guard-for-in
      for (const prop in prevState) {
        // eslint-disable-next-line no-loop-func
        formControls.map(ctrl => {
          // eslint-disable-next-line eqeqeq
          if (prop === ctrl.name) {
            newState = {
              ...newState,
              [prop]: ctrl.hiddenConstValue || ctrl.defaultInputValue || ctrl.value || ''
            }
          }
        })
      }
      return { ...prevState, ...newState }
    })
    return () => {
      console.log(`custom form unmounted`)
      setParentState(null)
    }
  }, [])

  return (
    <>
      {isRegistered && redirectUrl && <Redirect to={redirectUrl} />}
      <Grid container>
        <form onSubmit={handleSubmit} style={{ margin: '1rem' }}>
          <Grid item>
            <Typography variant="h4" align="center">
              {header}
            </Typography>
          </Grid>
          {formControls?.length > 0 &&
            formControls.map((form: IFormControl, index: number) => (
              <Grid item key={form.label}>
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
                <Button variant="outlined" color="secondary" onClick={handleGetState}>
                  getState
                </Button>
              </Grid>
            </Grid>
          ) : null}
          {backButton ? (
            <Grid
              container
              item
              justifyContent="space-evenly"
              style={{ marginTop: '0.9rem', marginBottom: '0.9rem' }}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    // eslint-disable-next-line no-unused-expressions
                    history.go(-1)
                  }}
                >
                  <IconButton>
                    <ArrowBackRoundedIcon />
                  </IconButton>
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
