import { cn, toDate } from '@/lib/utils'
import { jobTabs } from '@/constants'
import useJobs from '@/hooks/job/use-jobs'
import useSort from '@/hooks/query/use-sort'
import { Link, createFileRoute } from '@tanstack/react-router'
import { jobSearchSchema } from '@/lib/validation/job.validation'

import { Plus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DialogDeleteJob from '@/components/jobs/dialog-delete-job'
import DropdownSettingJob from '@/components/jobs/dropdown-setting-job'
import { Badge } from '@/components/ui/badge'
import Paginator from '@/components/shared/paginator'
import SearchForm from '@/components/shared/search-form'
import { Button } from '@/components/ui/button'
import TableRowsSkeleton from '@/components/shared/table-rows-skeleton'
import { useEffect } from 'react'

export const Route = createFileRoute('/_employee-layout/jobs/')({
  component: JobsPage,
  validateSearch: (search) => jobSearchSchema.parse(search)
})

function JobsPage() {
  const { pageNumber, pageSize, search, status, sort } = Route.useSearch()

  useEffect(() => {
    console.log({ pageNumber })
  }, [pageNumber])

  const { Icon: CodeSortIcon, sorter: handleSortByCode } = useSort({ key: 'code', sortParams: sort })
  const { Icon: NameSortIcon, sorter: handleSortByName } = useSort({ key: 'name', sortParams: sort })
  const { Icon: CreatedAtSortIcon, sorter: handleSortByCreatedAt } = useSort({ key: 'createdAt', sortParams: sort })

  const { data, isPending } = useJobs({ pageNumber, pageSize, search, status, sort })

  return (
    <section className='flex flex-col'>
      <div className='flex items-center justify-between gap-x-5'>
        <h3 className='text-2xl font-semibold'>Jobs</h3>
        <SearchForm search={search} placeholder='Search jobs...' />
        <Button asChild>
          <Link to='/jobs/create'>
            <Plus className='mr-1 size-5' />
            Create Job
          </Link>
        </Button>
      </div>

      <div className='my-5 rounded-2xl bg-card p-4'>
        <div className='mb-4 flex gap-x-8 border-b'>
          {jobTabs.map((tab) => {
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
                  <TableHead onClick={handleSortByName} className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center'>
                      <p className='select-none text-nowrap'>Job Name</p>
                      <NameSortIcon />
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
                {isPending && <TableRowsSkeleton colSpan={5} pageSize={pageSize} />}

                {data?.items.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className='font-extrabold'>{job.code}</TableCell>
                    <TableCell className='flex items-center gap-x-3 font-semibold'>
                      <img alt='job' src={job.icon} className='size-8 rounded-md object-cover' />
                      <p>{job.name}</p>
                    </TableCell>

                    <TableCell className='text-center'>{toDate(job.createdAt)}</TableCell>

                    <TableCell className='text-center'>
                      {job.isOpening ? (
                        <Badge className='text-sm font-extrabold' variant='success'>
                          Opening
                        </Badge>
                      ) : (
                        <Badge className='text-sm font-extrabold' variant='danger'>
                          Closed
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className='flex justify-end'>
                      <DropdownSettingJob jobId={job.id} jobCode={job.code} isOpening={job.isOpening} />
                      <DialogDeleteJob jobId={job.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {!isPending && data?.items.length === 0 && (
          <div className='mt-36 text-center text-xl font-bold'>Not found any Jobs.</div>
        )}
      </div>

      {data && data.items.length > 0 && <Paginator metadata={data.metadata} />}
    </section>
  )
}

export default JobsPage
