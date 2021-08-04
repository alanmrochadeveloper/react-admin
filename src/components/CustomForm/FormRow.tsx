import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  MenuItem,
  TextField
} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CloudDoneIcon from '@material-ui/icons/CloudDone'
import axios from 'axios'
import React, { Dispatch } from 'react'
import { FormTypes } from './types/enums/FormTypes'
import { IFormControl, IOption } from './types/interfaces'

interface CustomFormRowProps extends IFormControl {
  index: number
  setParentState: Dispatch<any>
  parentState: any[]
  setIsUploaded: any
  isUploaded: boolean
  handleUpload: any
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
  hiddenConstValue = '',
  setParentState,
  parentState,
  regexes = [],
  setIsUploaded,
  isUploaded,
  handleUpload
}: CustomFormRowProps) => {
  const [control, setControl] = React.useState<any>()

  const [state, setState] = React.useState<any | null | undefined>({ ...parentState })
  const [checks, setChecks] = React.useState<IOption[]>(options)
  const [checkIds, setCheckIds] = React.useState<string[]>([])

  const formControl = (
    nameValue: string,
    typeValue: string,
    labelValue: string,
    placeholderValue: string,
    defaultInputValueValue: string,
    optionsValue: IOption[] = [],
    indexValue: number,
    variantValue: 'outlined' | 'standard' | 'filled' | undefined = 'outlined',
    stateValue: any,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    hiddenConstValueValue?: string
  ) => {
    switch (typeValue) {
      case FormTypes.CHECKBOX:
        return (
          <>
            {optionsValue.length > 0 && (
              <FormControl component="fieldset">
                <FormLabel component="legend">{`${labelValue}: `}</FormLabel>
                <FormGroup>
                  {optionsValue.map(({ title, value }, idx: number) => {
                    return (
                      <FormControlLabel
                        key={nameValue + title}
                        control={
                          <Checkbox
                            checked={stateValue?.[nameValue[idx]]}
                            onChange={handleChange}
                            name={nameValue}
                            id={idx.toString()}
                            value={stateValue?.[nameValue[idx]]?.id || value}
                            defaultChecked={optionsValue[idx].checked}
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
            variant={variantValue}
            label={labelValue}
            select
            style={{ width: '100%' }}
            onChange={handleChange}
            value={stateValue?.[nameValue]}
            defaultValue={defaultInputValueValue}
          >
            {optionsValue.length > 0 &&
              optionsValue.map(({ title, value }, idx) => (
                <MenuItem
                  key={title + value}
                  value={value}
                  selected={stateValue?.[nameValue]?.[title + value]?.checked}
                >
                  {title}
                </MenuItem>
              ))}
          </TextField>
        )
      case FormTypes.HIDDEN:
        return <input name={nameValue} type={typeValue} value={hiddenConstValueValue} />
      case FormTypes.FILE:
        return (
          <>
            <Box>
              <Box>
                <TextField
                  disabled
                  name={nameValue}
                  type="text"
                  label={labelValue}
                  variant={variantValue}
                  value={stateValue?.[nameValue] as string}
                  defaultValue={defaultInputValueValue || ''}
                />
              </Box>
              <Box>
                <TextField
                  style={{ maxWidth: '12.8rem' }}
                  name={nameValue}
                  type={typeValue}
                  variant={variantValue}
                  value={stateValue?.[nameValue]}
                  onChange={handleChange}
                  defaultValue={defaultInputValueValue || ''}
                />
              </Box>
              <Box textAlign="center">
                {console.log(`rendered method render of upload icon, isUploaded = ${isUploaded}`)}
                {!isUploaded ? (
                  <IconButton onClick={handleUpload}>
                    <CloudUploadIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    disabled={isUploaded}
                    style={isUploaded ? { backgroundColor: 'green' } : { backgroundColor: 'grey' }}
                  >
                    <CloudDoneIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          </>
        )
      default:
        return (
          <TextField
            name={nameValue}
            type={typeValue}
            label={labelValue}
            placeholder={placeholderValue || ''}
            variant={variantValue}
            value={stateValue?.[nameValue]}
            onChange={handleChange}
            defaultValue={defaultInputValueValue || ''}
          />
        )
    }
  }

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
      case FormTypes.FILE:
        setState({ ...state, [name]: event.target.files })
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
    console.log(
      `checks changed, value = ${JSON.stringify(checks)}, state = ${JSON.stringify(state)}`
    )

    setCheckIds(() => {
      const newCheckList: IOption[] = checks.filter(c => c.checked)
      const newCheckIdList: string[] = newCheckList.map(nc => {
        return nc.value
      })
      return [...newCheckIdList]
    })
  }, [checks])

  React.useEffect(() => {
    setState((prevState: any) => {
      return {
        ...prevState,
        [name]: checkIds
      }
    })
  }, [checkIds])

  React.useEffect(() => {
    setParentState((prevState: any) => {
      return {
        ...prevState,
        [name]:
          hiddenConstValue ||
          (typeof state?.[name] === 'object' && type !== FormTypes.CHECKBOX ? '' : state?.[name]) ||
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
