import { Button, makeStyles, TableCell, TableRow, Theme } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Product } from '../../models/product'

interface ProductTableRowProps {
  product: Product
  index: number
  setProducts: any
  products: Product[]
}

const useStyle = makeStyles((theme: Theme) => ({
  deleteButton: {
    backgroundColor: theme.palette.error.light,
    margin: theme.spacing(1)
  },
  editButton: {
    background: theme.palette.warning.light,
    margin: theme.spacing(1)
  }
}))

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  index,
  setProducts,
  products
}: ProductTableRowProps) => {
  const classes = useStyle()
  const history = useHistory()

  const handleClickEdit = () => {
    history.push(`products/${product.id}/edit`)
  }

  const handleClickDelete = async () => {
    if (
      window.confirm(
        `Tem certeza que deseja deletar o produto ${product.title} com o id ${product.id}`
      )
    ) {
      try {
        await axios.delete(`products/${product.id}`, { withCredentials: true })
        setProducts((prevState: Product[]) => {
          return prevState.filter((u: Product) => u.id !== product.id)
        })
        alert(`Produto deletado com sucesso!`)
      } catch (error) {
        alert(`error = ${error.message}`)
        console.log(`error = ${JSON.stringify(error.message)}`)
      }
    }
  }

  return (
    <>
      <TableRow
        hover
        key={product && product.id && product.id}
        style={{ backgroundColor: `${index % 2 === 0 ? '#e2e2e2' : 'inherit'}` }}
      >
        <TableCell component="th" scope="user">
          {product && product.id && product.id.substr(0, 5)}
        </TableCell>
        <TableCell align="right">{product.image}</TableCell>
        <TableCell align="right">{product.title}</TableCell>
        <TableCell align="right">{product.description}</TableCell>
        <TableCell align="right">{product.price}</TableCell>
        <TableCell align="right">
          <Button variant="contained" className={classes.deleteButton} onClick={handleClickDelete}>
            Delete
          </Button>
          <Button variant="contained" className={classes.editButton} onClick={handleClickEdit}>
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}
export default ProductTableRow
