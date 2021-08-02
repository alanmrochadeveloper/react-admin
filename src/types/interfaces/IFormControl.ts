import { FormTypes } from '../enums/form-types.enum'
import { IOption } from './IOption'
import { IRegex } from './IRegex'

export interface IFormControl {
  name: string
  type: FormTypes
  label: string
  placeholder: string
  variant?: 'outlined' | 'standard' | 'filled' | undefined
  value?: string
  options?: IOption[]
  regexes?: IRegex[]
  disabled?: boolean
  deafultInputValue?: string
}
