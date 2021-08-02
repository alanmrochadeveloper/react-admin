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
import { FormTypes } from './types/enums/FormTypes'
import { IFormControl, IOption } from './types/interfaces'

const formControl = (
  name: string,
  type: string,
  label: string,
  placeholder: string,
  defaultInputValue: string,
  options: IOption[] = [],
  index: number,
  variant: 'outlined' | 'standard' | 'filled' | undefined = 'outlined',
  state: any,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
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
                          checked={state?.[name[idx]]}
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
          value={state?.[name]}
          defaultValue={defaultInputValue}
        >
          {options.length > 0 &&
            options.map(({ title, value }, idx) => (
              <MenuItem
                key={title + value}
                value={value}
                selected={state?.[name]?.[title + value]?.checked}
              >
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
          placeholder={placeholder || ''}
          variant={variant}
          value={state?.[name]}
          onChange={handleChange}
          defaultValue={defaultInputValue || ''}
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
  defaultInputValue = '',
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

  const [state, setState] = React.useState<any | null | undefined>({ ...parentState })
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
        defaultInputValue,
        options,
        index,
        variant,
        parentState,
        handleChange,
        hiddenConstValue
      )
    )
    setState((prevState: any) => {
      const val = hiddenConstValue || state[name] || defaultInputValue || ''

      return { ...prevState, [name]: val }
    })
    // eslint-disable-next-line no-unused-expressions

    return () => {
      console.log(`form row unmounted`)
      setParentState(null)
      setState(null)
    }
  }, [])

  React.useEffect(() => {
    setState((prevState: any) => {
      return {
        ...prevState,
        [name]: checks
      }
    })
  }, [checks])

  React.useEffect(() => {
    setParentState((prevState: any) => {
      return {
        ...prevState,
        [name]:
          hiddenConstValue ||
          (typeof state?.[name] === 'object' ? '' : state?.[name]) ||
          defaultInputValue ||
          ''
      }
    })
  }, [state])

  return (
    <>
      <Box padding="0.4rem 0rem">{control}</Box>
    </>
  )
}
export default CustomFormRow
