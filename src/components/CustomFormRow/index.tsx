import {
  Box,
  Button,
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
import { FormTypes } from '../../types/enums/form-types.enum'
import { IFormControl } from '../../types/interfaces/IFormControl'
import { IOption } from '../../types/interfaces/IOption'

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
  handleSelectChange: (event: React.ChangeEvent<{ value: unknown }>) => void
) => {
  switch (type) {
    case FormTypes.CHECKBOX:
      console.log(
        'realmente entrou no check form type and type itself = ',
        FormTypes.CHECKBOX,
        type
      )
      return (
        <>
          {options.length > 0 && (
            <FormControl component="fieldset">
              <FormLabel component="legend">{name}</FormLabel>
              <FormGroup>
                {options.map(({ title }, idx) => (
                  <FormControlLabel
                    key={name + title}
                    name={name}
                    control={
                      <Checkbox
                        checked={state[title + idx]}
                        onChange={handleChange}
                        name={title + idx}
                      />
                    }
                    label={title}
                  />
                ))}
              </FormGroup>
              <FormHelperText>Be careful</FormHelperText>
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
            variant={variant}
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
      break
    default:
      console.log('caiu no default form type and type itself = ', FormTypes.CHECKBOX, type)
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
  options,
  index,
  variant,
  setParentState,
  parentState
}: CustomFormRowProps) => {
  const [control, setControl] = React.useState<React.ReactElement>()
  // this is for the control itself

  // this is for input types like, text, email, password
  const [state, setState] = React.useState<IOption[]>([])
  // const [values, setValues] = React.useState<any>([])

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState({ ...state, [name]: event.target.value as string })
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case FormTypes.CHECKBOX:
        setState({ ...state, [event.target.name]: event.target.checked })
        break
      case FormTypes.SELECT:
        break
      default:
        setState({ ...state, [event.target.name]: event.target.value })
    }
  }

  React.useEffect(() => {
    console.log('printing the current type = ', type)
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
        handleSelectChange
      )
    )
  }, [])

  React.useEffect(() => {
    setParentState({ ...parentState, [name]: state[name] })
  }, [state])

  React.useEffect(() => {
    // console.log('component did update')
  })

  React.useEffect(() => {
    return () => {
      // console.log('component did unmount')
    }
  })

  return (
    <>
      <Box padding="0.4rem 0rem">{control}</Box>
    </>
  )
}
export default CustomFormRow
