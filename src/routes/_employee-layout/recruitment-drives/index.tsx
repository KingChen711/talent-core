import DialogDeleteRecruitmentDrive from '@/components/recruitment-drive/dialog-delete-recruitment-drive'
import DropdownSettingRecruitmentDrive from '@/components/recruitment-drive/dropdown-setting-recruitment-drive'
import RecruitmentDriveBadge from '@/components/recruitment-drive/recruitment-drive-badge'
import Paginator from '@/components/shared/paginator'
import SearchForm from '@/components/shared/search-form'
import TableRowsSkeleton from '@/components/shared/table-rows-skeleton'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { recruitmentDriveTabs } from '@/constants'
import useSort from '@/hooks/query/use-sort'
import useRecruitmentDrives from '@/hooks/recruitment-drive/use-recruitment-drives'
import { cn, toDate } from '@/lib/utils'
import { getRecruitmentDrivesSchema } from '@/lib/validation/recruitment-drive.validation'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/_employee-layout/recruitment-drives/')({
  component: RecruitmentDrivesPage,
  validateSearch: (search) => getRecruitmentDrivesSchema.parse(search)
})

function RecruitmentDrivesPage() {
  const { pageNumber, pageSize, search, status, sort } = Route.useSearch()

  const { Icon: StartDateSortIcon, sorter: handleSortByStartDate } = useSort({ key: 'startDate', sortParams: sort })
  const { Icon: EndDateSortIcon, sorter: handleSortByEndDate } = useSort({ key: 'endDate', sortParams: sort })
  const { Icon: NameSortIcon, sorter: handleSortByName } = useSort({ key: 'name', sortParams: sort })
  const { Icon: CodeSortIcon, sorter: handleSortByCode } = useSort({ key: 'code', sortParams: sort })
  const { Icon: CreatedAtSortIcon, sorter: handleSortByCreatedAt } = useSort({ key: 'createdAt', sortParams: sort })

  const { data, isPending } = useRecruitmentDrives({ pageNumber, pageSize, search, status, sort })

  return (
    <section className='flex flex-col'>
      <div className='flex items-center justify-between gap-x-5'>
        <h3 className='text-2xl font-semibold'>Recruitment Drives</h3>
        <SearchForm search={search} placeholder='Search recruitment drives...' />
        <Button asChild>
          <Link to='/recruitment-drives/create'>
            <Plus className='mr-1 size-5' />
            Create Recruitment Drive
          </Link>
        </Button>
      </div>

      <div className='my-5 rounded-2xl bg-card p-4'>
        <div className='mb-4 flex gap-x-8 border-b'>
          {recruitmentDriveTabs.map((tab) => {
            const active = status === tab.status

            return (
              <Link
                search={(prev) => ({ ...prev, status: tab.status, pageNumber: 1, sort: '-createdAt' })}
                key={tab.status}
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
                  <TableHead onClick={handleSortByCode} className='h-10 cursor-pointer rounded-l-lg'>
                    <div className='flex items-center'>
                      <p className='select-none'>Code</p>
                      <CodeSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByName} className='h-10 cursor-pointer'>
                    <div className='flex items-center'>
                      <p className='select-none'>Name</p>
                      <NameSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByStartDate} className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center justify-center'>
                      <p className='select-none'>Start Date</p>
                      <StartDateSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByEndDate} className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center justify-center'>
                      <p className='select-none'>End Date</p>
                      <EndDateSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByCreatedAt} className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center justify-center'>
                      <p className='select-none'>Created At</p>
                      <CreatedAtSortIcon />
                    </div>
                  </TableHead>
                  <TableHead className='h-10 select-none text-center'>Status</TableHead>
                  <TableHead className='h-10 select-none text-nowrap rounded-r-lg text-end'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending && <TableRowsSkeleton colSpan={7} pageSize={pageSize} />}

                {data?.items.map((recruitmentDrive) => (
                  <TableRow key={recruitmentDrive.id}>
                    <TableCell className='font-extrabold'>{recruitmentDrive.code}</TableCell>
                    <TableCell>{recruitmentDrive.name}</TableCell>
                    <TableCell className='text-center'>{toDate(recruitmentDrive.startDate)}</TableCell>
                    <TableCell className='text-center'>{toDate(recruitmentDrive.endDate)}</TableCell>
                    <TableCell className='text-center'>{toDate(recruitmentDrive.createdAt)}</TableCell>
                    <TableCell className='text-center'>
                      <RecruitmentDriveBadge status={recruitmentDrive.status} />
                    </TableCell>
                    <TableCell className='flex justify-end'>
                      <DropdownSettingRecruitmentDrive
                        recruitmentDriveId={recruitmentDrive.id}
                        recruitmentDriveCode={recruitmentDrive.code}
                        showAddJobs={recruitmentDrive.status !== 'Closed'}
                      />
                      <DialogDeleteRecruitmentDrive recruitmentDriveId={recruitmentDrive.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {!isPending && data?.items.length === 0 && (
          <div className='mt-36 text-center text-xl font-bold'>Not found any Recruitment Drives.</div>
        )}
      </div>

      {data && data.items.length > 0 && <Paginator metadata={data.metadata} />}
    </section>
  )
}

export default RecruitmentDrivesPage
