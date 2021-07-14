import { FormTypes } from '../enums/form-types.enum'
import { IOption } from './IOption'

export interface IFormControl {
  name: string
  type: FormTypes
  label: string
  placeholder: string
  variant?: 'outlined' | 'standard' | 'filled' | undefined
  value?: string
  options?: IOption[]
}
