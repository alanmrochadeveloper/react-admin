import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
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
  handleSelectChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
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
                  return (
                    <FormControlLabel
                      key={name + title}
                      control={
                        <Checkbox
                          checked={state[name]}
                          onChange={handleChange}
                          name={name}
                          id={idx.toString()}
                          value={value}
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
        <FormControl style={{ minWidth: '12.5rem', maxHeight: '4rem' }}>
          <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-select-label`}
            id={`${name}-select-label`}
            value={state[name]}
            name={name}
            onChange={handleSelectChange}
            variant="standard"
            defaultValue="Type"
          >
            {options.length > 0 &&
              options.map(({ title, value }) => (
                <MenuItem key={title + value} value={value}>
                  {title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )
    case FormTypes.HIDDEN:
      return (
        <TextField
          name={name}
          type={type}
          label={label}
          placeholder={placeholder}
          variant={variant}
          value={hiddenConstValue}
          onChange={handleChange}
        />
      )
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

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState({ ...state, [name]: event.target.value as string })
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case FormTypes.CHECKBOX:
        setChecks([
          ...checks,
          (checks[event.target.id] = {
            ...checks[event.target.id],
            checked: event.target.checked,
            value: event.target.value
          })
        ])
        setState({
          ...state,
          [event.target.name]: checks
        })
        break
      case FormTypes.SELECT:
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
        state,
        handleChange,
        handleSelectChange,
        hiddenConstValue
      )
    )
  }, [])

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
