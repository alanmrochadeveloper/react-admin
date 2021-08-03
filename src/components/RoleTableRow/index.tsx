import {
  Button,
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  Theme,
  useTheme
} from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Role } from '../../models/role'
import { IUser } from '../../types/interfaces/IUser'

interface RoleTableRowProps {
  role: Role
  index: number
  setRoles: any
  roles: Role[]
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

const RoleTableRow: React.FC<RoleTableRowProps> = ({
  role,
  index,
  setRoles,
  roles
}: RoleTableRowProps) => {
  const classes = useStyle()
  const history = useHistory()

  const handleClickEdit = () => {
    history.push(`editrole/${role.id}`)
  }

  const handleClickDelete = async () => {
    if (window.confirm(`Tem certeza que deseja deletar o role ${role.name} com o id ${role.id}`)) {
      try {
        await axios.delete(`roles/${role.id}`, { withCredentials: true })
        setRoles((prevState: Role[]) => {
          return prevState.filter((r: Role) => r.id !== role.id)
        })
        alert(`Role deletado com sucesso!`)
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
        key={role && role.id && role.id}
        style={{ backgroundColor: `${index % 2 === 0 ? '#e2e2e2' : 'inherit'}` }}
      >
        <TableCell component="th" scope="role">
          {role && role.id && role.id.substr(0, 5)}
        </TableCell>
        <TableCell align="right">{`${role.name}`}</TableCell>
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
export default RoleTableRow
