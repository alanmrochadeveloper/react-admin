import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import DashboardWrapper from '../../components/DashboardWrapper'
import UserTableRow from '../../components/UserTableRow'
import { IUser } from '../../types/interfaces/IUser'

interface UsersProps {
  users: IUser[]
}
const Users: React.FC<UsersProps> = ({ users }: UsersProps) => {
  return (
    <DashboardWrapper>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Orders</TableCell>
              <TableCell align="right">Products</TableCell>
              <TableCell align="right">Acess Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <UserTableRow user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardWrapper>
  )
}
export default Users
