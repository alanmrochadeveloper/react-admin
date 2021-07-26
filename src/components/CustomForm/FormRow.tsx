import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuItem,
  TextField
} from '@material-ui/core'
import React, { Dispatch } from 'react'
// eslint-disable-next-line max-len
// import { FormTypes } from '../../types/enums/form-types.enum' commented out for reusability purposes
// import { IFormControl } from '../../types/interfaces/IFormControl'
// import { IOption } from '../../types/interfaces/IOption'

// all types and interfaces were imported here for reusability

const formControl = (
  name: string,
  type: string,
  label: string,
  placeholder: string,
  options: IOption[] = [],
  index: number,
  variant: 'outlined' | 'standard' | 'filled' | undefined = 'outlined',
  state: any,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  // handleSelectChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
  hiddenConstValue?: string
) => {
  switch (type) {
    case FormTypes.CHECKBOX:
      return (
        <>
          {options.length > 0 && (
            <FormControl component="fieldset">
              <FormLabel component="legend">{`${label}: `}</FormLabel>
              <FormGroup>
                {options.map(({ title, value }, idx: number) => {
                  console.log(
                    `state = ${JSON.stringify(state)}, state[name] = ${state[name]},
                     value = ${value}, idx = ${idx}, state[name[idx]] =  ${state[name[idx]]},
                     name = ${name}`
                  )

                  return (
                    <FormControlLabel
                      key={name + title}
                      control={
                        <Checkbox
                          checked={state[name[idx]]}
                          onChange={handleChange}
                          name={name}
                          id={idx.toString()}
                          value={value}
                          defaultChecked={options[idx].checked}
                        />
                      }
                      label={title}
                    />
                  )
                })}
              </FormGroup>
              <FormHelperText>Alert</FormHelperText>
            </FormControl>
          )}
        </>
      )
    case FormTypes.SELECT:
      return (
        <TextField
          variant={variant}
          label={label}
          select
          style={{ width: '100%' }}
          onChange={handleChange}
        >
          {options.length > 0 &&
            options.map(({ title, value }, idx) => (
              <MenuItem key={title + value} value={value} selected={idx === 0}>
                {title}
              </MenuItem>
            ))}
        </TextField>
      )
    case FormTypes.HIDDEN:
      return <input name={name} type={type} value={hiddenConstValue} />
    default:
      return (
        <TextField
          name={name}
          type={type}
          label={label}
          placeholder={placeholder}
          variant={variant}
          value={state[name]}
          onChange={handleChange}
        />
      )
  }
}

interface CustomFormRowProps extends IFormControl {
  index: number
  setParentState: Dispatch<any>
  parentState: any[]
}
const CustomFormRow: React.FC<CustomFormRowProps> = ({
  name,
  type,
  label,
  placeholder,
  options = [],
  index,
  variant = 'outlined',
  value = '',
  hiddenConstValue = '',
  setParentState,
  parentState,
  regexes = []
}: CustomFormRowProps) => {
  const [control, setControl] = React.useState<React.ReactElement>()

  const [state, setState] = React.useState<IFormControl[]>([])
  const [checks, setChecks] = React.useState<IOption[]>(options)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case FormTypes.CHECKBOX:
        setChecks((prevState: IOption[]) => {
          return prevState.map((item: IOption, idx: number) => {
            if (idx !== Number(event.target.id)) {
              return item
            }
            return {
              ...item,
              checked: event.target.checked
            }
          })
        })
        break
      case FormTypes.SELECT:
        setState({ ...state, [name]: event.target.value as string })
        break
      default:
        setState({ ...state, [event.target.name]: event.target.value })
    }
  }

  React.useEffect(() => {
    setControl(
      formControl(
        name,
        type,
        label,
        placeholder,
        options,
        index,
        variant,
        parentState,
        handleChange,
        hiddenConstValue
      )
    )

    console.log(`state inside component did mount = ${JSON.stringify(state)}`)
  }, [])

  React.useEffect(() => {
    setState({
      ...state,
      [name]: checks
    })
  }, [checks])

  React.useEffect(() => {
    setParentState({ ...parentState, [name]: state[name] })
  }, [state])

  return (
    <>
      <Box padding="0.4rem 0rem">{control}</Box>
    </>
  )
}
export default CustomFormRow

export enum FormTypes {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  HIDDEN = 'hidden'
}

export interface IOption {
  title?: string
  checked?: boolean
  value?: string
}
export interface IFormControl {
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

export interface IRegex {
  description?: string
  info?: string
  warn?: string
  error?: string
  passed: boolean
  value: any
}
