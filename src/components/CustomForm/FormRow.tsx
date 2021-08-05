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
import Loading from '../Loading'

interface CustomFormRowProps extends IFormControl {
  index: number
  setParentState: Dispatch<any>
  parentState: any[]
  setIsUploaded: any
  isUploaded: boolean
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
  isUploaded
}: CustomFormRowProps) => {
  const [control, setControl] = React.useState<any>()

  const [state, setState] = React.useState<any | null | undefined>({
    ...parentState
  })
  const [checks, setChecks] = React.useState<IOption[]>(options)
  const [checkIds, setCheckIds] = React.useState<string[]>([])
  const [imageUrl, setImageUrl] = React.useState<string>('')
  const [imageFile, setImageFile] = React.useState(null)
  const [loading, setLoading] = React.useState<boolean>(false)

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
      case FormTypes.TEXT:
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
      case FormTypes.PASSWORD:
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
      case FormTypes.NUMBER:
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
      default:
        return null
    }
  }

  const handleUpload = async () => {
    setIsUploaded((prevState: boolean) => !prevState)
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', imageFile)
      const { data } = await axios.post(`upload`, formData)
      setImageUrl(data.url)
      setIsUploaded(true)
      setLoading(false)
    } catch (error) {
      console.log(`error = ${JSON.stringify(error)}`)
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
        setState((prevState: any) => {
          return { ...prevState, [event.target.name]: event.target.value as string }
        })
        break
      case FormTypes.FILE:
        setState((prevState: any) => {
          return { ...prevState, [name]: imageUrl || event.target.value }
        })
        setImageFile(event.target.files[0])
        break
      default:
        setState((prevState: any) => {
          return { ...prevState, [event.target.name]: event.target.value }
        })
    }
  }

  React.useEffect(() => {
    console.log(`component form row did mount state value = ${JSON.stringify(state)},
      parent value = ${JSON.stringify(parentState)}
    `)
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
      console.log(
        `inside setState component did mount, prevState value = ${JSON.stringify(prevState)}`
      )
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

  React.useEffect(() => {
    if (type === FormTypes.FILE)
      setState((prevState: any) => {
        return { ...prevState, [name]: imageUrl }
      })
  }, [imageUrl])

  return (
    <>
      <Box padding="0.4rem 0rem">{control}</Box>

      {console.log(
        `rendered method render of upload icon, isUploaded = ${isUploaded}, type === ${type}`
      )}
      {type === FormTypes.FILE ? (
        <Box>
          <Box>
            <TextField
              style={{ maxWidth: '15.39rem' }}
              disabled={isUploaded}
              name={name}
              type={type}
              variant={variant}
              onChange={handleChange}
            />
          </Box>
        </Box>
      ) : null}
      {type === FormTypes.FILE ? (
        !isUploaded ? (
          <Box textAlign="center">
            <IconButton onClick={handleUpload}>
              <CloudUploadIcon />
            </IconButton>
          </Box>
        ) : loading ? (
          <Box textAlign="center">
            <Loading />
          </Box>
        ) : (
          <Box>
            <Box>
              <Box>
                <img
                  style={{ maxWidth: '15.39rem' }}
                  src={imageUrl}
                  alt="product"
                  title={imageUrl}
                />
              </Box>
              <Box>
                <TextField
                  variant={variant}
                  label="Image"
                  InputProps={{ readOnly: true }}
                  value={imageUrl}
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Box textAlign="center">
              <IconButton disabled={isUploaded}>
                <CloudDoneIcon />
              </IconButton>
            </Box>
          </Box>
        )
      ) : null}
    </>
  )
}
export default CustomFormRow
