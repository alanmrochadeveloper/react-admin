import { TableCell, TableRow } from '@material-ui/core'
import React from 'react'
import { IUser } from '../../types/interfaces/IUser'

interface UserTableRowProps {
  user: IUser
}
const UserTableRow: React.FC<UserTableRowProps> = ({ user }: UserTableRowProps) => {
  return (
    <>
      <TableRow key={user.name}>
        <TableCell component="th" scope="user">
          {user.id}
        </TableCell>
        <TableCell align="right">{user.name}</TableCell>
        <TableCell align="right">{user.orders}</TableCell>
        <TableCell align="right">{user.products}</TableCell>
        <TableCell align="right">{user.accessLevel}</TableCell>
      </TableRow>
    </>
  )
}
export default UserTableRow
