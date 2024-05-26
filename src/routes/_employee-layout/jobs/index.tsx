import { cn } from '@/lib/utils'
import { z } from 'zod'
import { jobTabs } from '@/constants'
import useJobs from '@/hooks/job/use-jobs'
import { useEffect, useMemo, useState } from 'react'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { ChevronsDown, ChevronsUp, ChevronsUpDown, Plus, Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DialogDeleteJob from '@/components/jobs/dialog-delete-job'
import DropdownSettingJob from '@/components/jobs/dropdown-setting-job'
import { Badge } from '@/components/ui/badge'
import Paginator from '@/components/shared/paginator'
import { Button } from '@/components/ui/button'

const jobSearchSchema = z.object({
  pageNumber: z.number().catch(1),
  pageSize: z.number().catch(5),
  search: z.string().catch(''),
  status: z.enum(['all', 'opening', 'closed']).catch('all'),
  sort: z.enum(['code', 'name', '-code', '-name']).optional()
})

export type JobSearch = z.infer<typeof jobSearchSchema>

export const Route = createFileRoute('/_employee-layout/jobs/')({
  component: JobsPage,
  validateSearch: (search) => jobSearchSchema.parse(search)
})

function JobsPage() {
  const navigate = useNavigate()

  const { pageNumber, pageSize, search, status, sort } = Route.useSearch()
  const [searchTerm, setSearchTerm] = useState(search)

  const { data, isPending } = useJobs({ pageNumber, pageSize, search, status, sort })

  useEffect(() => {
    setSearchTerm(search)
  }, [search])

  const codeSortIcon = useMemo(() => {
    return sort === 'code' ? (
      <ChevronsUp className='ml-1 size-4' />
    ) : sort === '-code' ? (
      <ChevronsDown className='ml-1 size-4' />
    ) : (
      <ChevronsUpDown className='ml-1 size-4' />
    )
  }, [sort])

  const nameSortIcon = useMemo(() => {
    return sort === 'name' ? (
      <ChevronsUp className='ml-1 size-4' />
    ) : sort === '-name' ? (
      <ChevronsDown className='ml-1 size-4' />
    ) : (
      <ChevronsUpDown className='ml-1 size-4' />
    )
  }, [sort])

  const handleSortCode = () => {
    if (sort === 'code') {
      return navigate({
        search: (search) => ({
          ...search,
          sort: '-code',
          pageNumber: 1
        })
      })
    }

    return navigate({
      search: (search) => ({
        ...search,
        sort: 'code',
        pageNumber: 1
      })
    })
  }

  const handleSortName = () => {
    if (sort === 'name') {
      return navigate({
        search: (search) => ({
          ...search,
          sort: '-name',
          pageNumber: 1
        })
      })
    }

    return navigate({
      search: (search) => ({
        ...search,
        sort: 'name',
        pageNumber: 1
      })
    })
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    return navigate({
      search: (search) => ({
        ...search,
        search: searchTerm,
        pageNumber: 1
      })
    })
  }

  return (
    <section className='flex flex-col'>
      <div className='flex items-center justify-between gap-x-5'>
        <h3 className='text-3xl font-semibold'>Jobs</h3>
        <form onSubmit={handleSearch} className='flex max-w-md flex-1 items-center rounded-lg border-2 px-2'>
          <Search className='size-6' />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='rounded-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
            placeholder='Search jobs...'
          />
        </form>
        <Button asChild>
          <Link to='/jobs/create'>
            <Plus className='mr-1 size-5' />
            Create Job
          </Link>
        </Button>
      </div>

      <div className='my-5 min-h-[492px] rounded-2xl bg-card p-4'>
        <div className='mb-4 flex gap-x-8 border-b'>
          {jobTabs.map((tab) => {
            const active = status === tab.status

            return (
              <Link
                search={(prev) => ({ ...prev, status: tab.status, pageNumber: 1 })}
                key={tab.status}
                className={cn(
                  'relative w-[70px] pb-4 text-center text-muted',
                  active && 'text-gradient-foreground font-bold'
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
                  <TableHead onClick={handleSortCode} className='h-10 cursor-pointer rounded-l-lg'>
                    <div className='flex items-center'>
                      <p className='select-none'>Code</p>
                      {codeSortIcon}
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortName} className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center'>
                      <p className='select-none text-nowrap'>Job Name</p>
                      {nameSortIcon}
                    </div>
                  </TableHead>
                  <TableHead className='h-10 select-none text-center'>Status</TableHead>
                  <TableHead className='h-10 select-none text-nowrap rounded-r-lg text-end'>Job Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending && (
                  <>
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <TableRow key={i}>
                          <TableCell colSpan={4} className='p-0'>
                            <Skeleton className='my-2 h-14 w-full' />
                          </TableCell>
                        </TableRow>
                      ))}
                  </>
                )}

                {data?.items.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className='font-extrabold'>{job.code}</TableCell>
                    <TableCell className='flex items-center gap-x-3 font-semibold'>
                      <img alt='job' src={job.icon} className='size-8 rounded-md object-cover' />
                      <p>{job.name}</p>
                    </TableCell>
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
                      <DropdownSettingJob jobId={job.id} />
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

      {data && data.items.length > 0 && <Paginator navigate={navigate} metadata={data.metadata} />}
    </section>
  )
}

export default JobsPage
