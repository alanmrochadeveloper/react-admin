// import { FormTypes } from '../types/enums/form-types.enum'
// import { IFormControl } from '../types/interfaces/IFormControl'
// import { IOption } from '../types/interfaces/IOption'
// import { IRegex } from '../types/interfaces/IRegex'

import { FormTypes, IFormControl, IOption, IRegex } from '../components/CustomFormRow'

export const createControlsData = (
  name = 'none', // names must be unique
  type = FormTypes.TEXT,
  label = 'text',
  placeholder = 'text here',
  options?: IOption[],
  regexes?: IRegex[]
): IFormControl => {
  return { name, type, label, placeholder, options, regexes }
}
