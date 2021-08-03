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
import RoleTableRow from '../../components/RoleTableRow'
import { Role } from '../../models/role'
import { IUser } from '../../types/interfaces/IUser'

interface UsersProps {}
const Roles: React.FC<UsersProps> = () => {
  const initialRowsPerPage = [5, 10, 15, 50, 100]

  const [roles, setRoles] = React.useState<Role[]>([])
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
        const { data } = await axios.get(`roles?page=${page}&take=${take}`)
        const { meta } = data
        setPaginationTotalItems(meta.total)
        setPage(meta.page)
        setRoles(data.data)
      } catch (error) {
        console.log(`error = ${JSON.stringify(error)}`)
      }
    })()
  }, [])

  React.useEffect(() => {
    // this watch if page changes
    ;(async () => {
      try {
        const { data } = await axios.get(`roles?page=${page}&take=${take}`)
        const { meta } = data
        setPaginationTotalItems(meta.total)
        setPage(meta.page)
        setRoles(data.data)
      } catch (error) {
        console.log(`error = ${JSON.stringify(error)}`)
      }
    })()
  }, [page])

  React.useEffect(() => {
    ;(async () => {
      // this watch if take (rows per page) changes
      try {
        const { data } = await axios.get(`roles?page=${page}&take=${take}`)
        const { meta } = data
        setPaginationTotalItems(meta.total)
        setPage(meta.page)
        setRoles(data.data)
      } catch (error) {
        console.log(`error = ${JSON.stringify(error)}`)
      }
    })()
  }, [take])

  return (
    <DashboardWrapper>
      <Button variant="contained" onClick={() => history.push('/createrole')}>
        Create role
      </Button>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="h4"> Roles list</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right" rowSpan={2}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role, index: number) => (
              <RoleTableRow
                key={role.id}
                role={role}
                index={index}
                setRoles={setRoles}
                roles={roles}
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
export default Roles
