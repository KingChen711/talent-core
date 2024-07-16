import { userTabs } from '@/constants'
import { cn } from '@/lib/utils'
import { getUsersSchema } from '@/lib/validation/user.validation'
import { Role } from '@/types'
import { Link, createFileRoute } from '@tanstack/react-router'

import useSort from '@/hooks/query/use-sort'
import useUsers from '@/hooks/user/use-users'

import Paginator from '@/components/shared/paginator'
import SearchForm from '@/components/shared/search-form'
import TableRowsSkeleton from '@/components/shared/table-rows-skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DialogToBeEmployee from '@/components/user/dialog-to-employee'
import RoleBadge from '@/components/user/role-badge'

export const Route = createFileRoute('/_employee-layout/users/')({
  component: UsersPage,
  validateSearch: (search) => getUsersSchema.parse(search)
})

function UsersPage() {
  const { pageNumber, pageSize, search, role, sort } = Route.useSearch()

  const { Icon: EmailSortIcon, sorter: handleSortByEmail } = useSort({ key: 'email', sortParams: sort })
  const { Icon: FullNameSortIcon, sorter: handleSortByFullName } = useSort({ key: 'fullName', sortParams: sort })
  const { Icon: PhoneSortIcon, sorter: handleSortByPhone } = useSort({ key: 'phone', sortParams: sort })
  const { Icon: BornYearSortIcon, sorter: handleSortByBornYear } = useSort({ key: 'bornYear', sortParams: sort })

  const { data, isPending } = useUsers({ pageNumber, pageSize, search, role, sort })

  return (
    <section className='flex flex-col'>
      <div className='flex items-center justify-between gap-x-5'>
        <h3 className='text-2xl font-semibold'>Accounts</h3>
        <SearchForm search={search} placeholder='Search accounts...' />
      </div>

      <div className='my-5 rounded-2xl bg-card p-4'>
        <div className='mb-4 flex gap-x-8 border-b'>
          {userTabs.map((tab) => {
            const active = role === tab.role

            return (
              <Link
                search={(prev) => ({ ...prev, role: tab.role, pageNumber: 1, sort: '-createdAt' })}
                key={tab.role}
                className={cn(
                  'relative w-[70px] pb-4 text-center text-muted-foreground',
                  active && 'text-card-foreground font-bold'
                )}
              >
                {tab.label}
                {active && <div className='bg-gradient absolute bottom-0 left-0 h-[3px] w-full'></div>}
              </Link>
            )
          })}
        </div>

        <div className='grid w-full'>
          <div className='overflow-x-auto'>
            <Table className='overflow-hidden'>
              <TableHeader className='rounded-lg bg-border'>
                <TableRow className='rounded-lg'>
                  <TableHead onClick={handleSortByEmail} className='h-10 cursor-pointer rounded-l-lg'>
                    <div className='flex items-center'>
                      <p className='select-none'>Email</p>
                      <EmailSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByFullName} className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center'>
                      <p className='select-none text-nowrap'>Full Name</p>
                      <FullNameSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByBornYear} className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center justify-center'>
                      <p className='select-none'>Born Year</p>
                      <BornYearSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByPhone} className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center justify-center'>
                      <p className='select-none'>Phone</p>
                      <PhoneSortIcon />
                    </div>
                  </TableHead>
                  <TableHead className='h-10 select-none text-nowrap rounded-r-lg text-center'>Gender</TableHead>
                  <TableHead className='h-10 select-none text-nowrap rounded-r-lg text-center'>Role</TableHead>
                  <TableHead className='h-10 select-none text-nowrap rounded-r-lg text-end'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending && <TableRowsSkeleton colSpan={5} pageSize={pageSize} />}

                {data?.items.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className='font-extrabold'>{user.email}</TableCell>
                    <TableCell className='font-extrabold'>{user.fullName}</TableCell>
                    <TableCell className='text-center font-extrabold'>{user.bornYear || '_'}</TableCell>
                    <TableCell className='text-center font-extrabold'>{user.phone || '_'}</TableCell>
                    <TableCell className='text-center font-extrabold'>{user.gender || '_'}</TableCell>
                    <TableCell className='flex justify-center'>
                      <RoleBadge role={user.role.roleName as Role} />
                    </TableCell>
                    <TableCell>
                      {user.role.roleName === 'Candidate' && <DialogToBeEmployee userId={user.id} />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {!isPending && data?.items.length === 0 && (
          <div className='mt-36 text-center text-xl font-bold'>Not found any Users.</div>
        )}
      </div>

      {data && data.items.length > 0 && <Paginator metadata={data.metadata} />}
    </section>
  )
}

export default UsersPage
