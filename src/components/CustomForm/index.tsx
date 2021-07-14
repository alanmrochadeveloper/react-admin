import { Button, Grid } from '@material-ui/core'
import React from 'react'
import { IFormControl } from '../../types/interfaces/IFormControl'
import CustomFormRow from '../CustomFormRow'

interface CustomFormProps {
  formControls: IFormControl[]
}
const CustomForm: React.FC<CustomFormProps> = ({ formControls }: CustomFormProps) => {
  const [parentState, setParentState] = React.useState<any>({})

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | undefined) => {
    event?.preventDefault()
    console.log('form submitted, parent state = ', parentState)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* {formControls.length === 0 && `No Forms Data`} */}
        {formControls.length > 0 &&
          formControls.map((form: IFormControl, index: number) => (
            <Grid item key={form.label}>
              {' '}
              <CustomFormRow
                {...form}
                index={index}
                setParentState={setParentState}
                parentState={parentState}
              />
            </Grid>
          ))}
        <Button type="submit" variant="outlined">
          Submit
        </Button>
        <Button type="reset" variant="outlined">
          Reset
        </Button>
      </form>
    </>
  )
}
export default CustomForm
