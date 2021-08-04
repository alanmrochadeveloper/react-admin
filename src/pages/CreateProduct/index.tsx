import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import React from 'react'
import CustomForm from '../../components/CustomForm'
import { FormTypes, RequestType } from '../../components/CustomForm/types/enums/FormTypes'
import { IFormControl } from '../../components/CustomForm/types/interfaces'
import { createControlsData } from '../../components/CustomForm/Utils/CreateFormControl'
import DashboardWrapper from '../../components/DashboardWrapper'

interface CreateProductProps {}
const CreateProduct: React.FC<CreateProductProps> = () => {
  const [controls, setControls] = React.useState<IFormControl[]>([])

  React.useEffect(() => {
    console.log(`products component did mount`)
    setControls([
      createControlsData('title', FormTypes.TEXT, 'Title', 'Type the title here'),
      createControlsData('description', FormTypes.TEXT, 'Description', 'Description of product'),
      createControlsData('price', FormTypes.NUMBER, 'Price', 'Price of product'),
      createControlsData('image', FormTypes.FILE, 'Image', 'Image of product')
    ])
  }, [])

  React.useEffect(() => {
    console.log(`controls created`)
  }, [controls])

  return (
    <DashboardWrapper>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          {controls.length > 0 ? (
            <CustomForm
              formControls={controls}
              axiosRequest={{ url: 'products', requestType: RequestType.POST }}
              redirectUrl="/products"
              header="Product"
              backButton
              submitButtonText="Create"
              test
              variant="outlined"
            />
          ) : (
            <Box>Loading...</Box>
          )}
        </Grid>
      </Grid>
    </DashboardWrapper>
  )
}
export default CreateProduct
