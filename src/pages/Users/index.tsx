import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { isConstructorDeclaration } from 'typescript'
import DashboardWrapper from '../../components/DashboardWrapper'
import UserTableRow from '../../components/UserTableRow'
import { User } from '../../models/user'
import { IUser } from '../../types/interfaces/IUser'

interface UsersProps {}
const Users: React.FC<UsersProps> = () => {
  const initialRowsPerPage = [5, 10, 15, 50, 100]

  const [users, setUsers] = React.useState<User[]>([])
  const [page, setPage] = React.useState<number>(1)
  const [take, setTake] = React.useState<number>(initialRowsPerPage[0])
  const [paginationTotalItems, setPaginationTotalItems] = React.useState<number>(0)

  const history = useHistory()

  const handleOnRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTake(parseInt(event.target.value, 10))
    setPage(1)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  React.useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get(`users?page=${page}&take=${take}`)
        const { meta } = data
        setPaginationTotalItems(meta.total)
        setPage(meta.page)
        setUsers(data.data)
      } catch (error) {
        console.log(`error = ${JSON.stringify(error)}`)
      }
    })()
  }, [])

  React.useEffect(() => {
    // this watch if page changes
    ;(async () => {
      try {
        const { data } = await axios.get(`users?page=${page}&take=${take}`)
        const { meta } = data
        setPaginationTotalItems(meta.total)
        setPage(meta.page)
        setUsers(data.data)
      } catch (error) {
        console.log(`error = ${JSON.stringify(error)}`)
      }
    })()
  }, [page])

  React.useEffect(() => {
    ;(async () => {
      // this watch if take (rows per page) changes
      try {
        const { data } = await axios.get(`users?page=${page}&take=${take}`)
        const { meta } = data
        setPaginationTotalItems(meta.total)
        setPage(meta.page)
        setUsers(data.data)
      } catch (error) {
        console.log(`error = ${JSON.stringify(error)}`)
      }
    })()
  }, [take])

  return (
    <DashboardWrapper>
      <Button variant="contained" onClick={() => history.push('/users/create')}>
        Create user
      </Button>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="h4"> Users list</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right" rowSpan={2}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index: number) => (
              <UserTableRow
                key={user.id}
                user={user}
                index={index}
                setUsers={setUsers}
                users={users}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableCell colSpan={5}>
              {' '}
              <TablePagination
                rowsPerPageOptions={initialRowsPerPage}
                component="div"
                count={paginationTotalItems}
                rowsPerPage={take}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleOnRowsPerPageChange}
              />
            </TableCell>
          </TableFooter>
        </Table>
      </TableContainer>
    </DashboardWrapper>
  )
}
export default Users
