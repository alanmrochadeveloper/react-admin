import { FormTypes, RequestType } from '../enums/FormTypes'

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

  defaultInputValue?: string
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

export interface IAxiosConfig {
  withCredentials?: boolean
}

export interface IAxiosRequest {
  url: string
  config?: IAxiosConfig
  requestType: RequestType
}
