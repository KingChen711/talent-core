import { applicationTabs } from '@/constants'
import { cn, toDate } from '@/lib/utils'
import { getMyApplicationsSchema } from '@/lib/validation/application.validation'
import { Link, createFileRoute } from '@tanstack/react-router'

import useMyApplications from '@/hooks/application/use-my-applications'
import useSort from '@/hooks/query/use-sort'

import ApplicationBadge from '@/components/shared/application-badge'
import Paginator from '@/components/shared/paginator'
import SearchForm from '@/components/shared/search-form'
import TableRowsSkeleton from '@/components/shared/table-rows-skeleton'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const Route = createFileRoute('/_main-layout/my-applications/')({
  component: MyApplications,
  validateSearch: (search) => getMyApplicationsSchema.parse(search)
})

function MyApplications() {
  const { pageNumber, pageSize, sort, status, search } = Route.useSearch()

  const { Icon: RecruitmentDriveSortIcon, sorter: handleSortByRecruitmentDrive } = useSort({
    key: 'recruitmentDrive',
    sortParams: sort
  })
  const { Icon: AppliedJobSortIcon, sorter: handleSortByAppliedJob } = useSort({ key: 'appliedJob', sortParams: sort })
  const { Icon: CreatedAtSortIcon, sorter: handleSortByCreatedAt } = useSort({ key: 'createdAt', sortParams: sort })

  const { data, isLoading } = useMyApplications({ pageNumber, pageSize, sort, status, search })

  return (
    <section>
      <div className='mb-2 mt-8 flex items-center justify-between gap-x-4'>
        <div className='text-2xl font-semibold'>My Applications</div>
        <SearchForm search={search} placeholder='Search applications...' />
      </div>

      <div className='my-5 rounded-2xl bg-card p-4'>
        <div className='mb-4 flex flex-wrap gap-x-8 gap-y-3 border-b'>
          {applicationTabs.map((tab) => {
            const active = status === tab.status

            return (
              <Link
                search={(prev) => ({ ...prev, status: tab.status, pageNumber: 1, sort: '-createdAt' })}
                key={tab.status}
                className={cn(
                  'relative w-24 pb-4 text-center text-muted-foreground',
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
                  <TableHead onClick={handleSortByRecruitmentDrive} className='h-10 cursor-pointer rounded-l-lg'>
                    <div className='flex items-center'>
                      <p className='select-none'>Recruitment Drive</p>
                      <RecruitmentDriveSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByAppliedJob} className='h-10 cursor-pointer'>
                    <div className='flex items-center'>
                      <p className='select-none'>Applied Job</p>
                      <AppliedJobSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByCreatedAt} className='h-10 cursor-pointer'>
                    <div className='flex items-center'>
                      <p className='select-none'>Applied Date</p>
                      <CreatedAtSortIcon />
                    </div>
                  </TableHead>

                  <TableHead className='h-10 select-none text-center'>Status</TableHead>
                  <TableHead className='h-10 select-none text-nowrap rounded-r-lg text-end'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && <TableRowsSkeleton colSpan={10} pageSize={pageSize} />}

                {data?.items?.map((application) => {
                  return (
                    <TableRow key={application.id}>
                      <TableCell>{application.jobDetail.recruitmentDrive.name}</TableCell>
                      <TableCell>
                        <div className='flex items-center gap-x-3 font-semibold'>
                          <img
                            alt='job'
                            src={application.jobDetail.job.icon}
                            className='size-8 rounded-full object-cover'
                          />
                          <p>{application.jobDetail.job.name}</p>
                        </div>
                      </TableCell>

                      <TableCell>{toDate(application.createdAt)}</TableCell>
                      <TableCell className='text-center'>
                        <div className='flex size-full items-center justify-center'>
                          <ApplicationBadge status={application.status} />
                        </div>
                      </TableCell>
                      <TableCell className='text-end'>
                        <Button variant='ghost' asChild size='icon'>
                          <Link to={`/my-applications/${application.id}`}>
                            <img alt='view-detail' src='/icons/actions/view-blue.svg' className='size-6' />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {!isLoading && data?.items.length === 0 && (
          <div className='mt-36 text-center text-xl font-bold'>Not found any Recruitment Drives.</div>
        )}
      </div>

      {data && data.items.length > 0 && <Paginator metadata={data.metadata} />}
    </section>
  )
}

export default MyApplications
