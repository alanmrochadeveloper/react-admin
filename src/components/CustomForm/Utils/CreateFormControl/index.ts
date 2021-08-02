import { FormTypes } from '../../types/enums/FormTypes'
import { IFormControl, IOption, IRegex } from '../../types/interfaces'

export const createControlsData = (
  name = 'none', // names must be unique
  type = FormTypes.TEXT,
  label = 'text',
  placeholder = 'text here',
  defaultInputValue?: string,
  options?: IOption[],
  regexes?: IRegex[],
  hiddenConstValue?: string,
  disabled?: false
): IFormControl => {
  return { name, type, label, placeholder, defaultInputValue, options, regexes, hiddenConstValue }
}
