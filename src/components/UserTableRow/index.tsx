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
import { User } from '../../models/user'
import { IUser } from '../../types/interfaces/IUser'

interface UserTableRowProps {
  user: User
  index: number
  setUsers: any
  users: User[]
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

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  index,
  setUsers,
  users
}: UserTableRowProps) => {
  const classes = useStyle()
  const history = useHistory()

  const handleClickEdit = () => {
    history.push(`edituser/${user.id}`)
  }

  const handleClickDelete = async () => {
    if (
      window.confirm(
        `Tem certeza que deseja deletar o usuário ${user.first_name} com o id ${user.id}`
      )
    ) {
      try {
        await axios.delete(`users/${user.id}`, { withCredentials: true })
        setUsers((prevState: User[]) => {
          return prevState.filter((u: User) => u.id !== user.id)
        })
        alert(`Usuário deletado com sucesso!`)
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
        key={user && user.id && user.id}
        style={{ backgroundColor: `${index % 2 === 0 ? '#e2e2e2' : 'inherit'}` }}
      >
        <TableCell component="th" scope="user">
          {user && user.id && user.id.substr(0, 5)}
        </TableCell>
        <TableCell align="right">{`${user.first_name} ${user.last_name}`}</TableCell>
        <TableCell align="right">{user.email}</TableCell>
        <TableCell align="right">{user.role?.name}</TableCell>
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
export default UserTableRow
