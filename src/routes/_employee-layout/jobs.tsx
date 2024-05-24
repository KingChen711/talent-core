import { jobTabs } from '@/constants'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

import useJobs from '@/hooks/job/user-jobs'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

const jobSearchSchema = z.object({
  pageNumber: z.number().catch(1),
  pageSize: z.number().catch(5),
  search: z.string().catch(''),
  status: z.enum(['all', 'opening', 'closed']).catch('all'),
  sort: z.enum(['code', 'name']).optional()
})

export type JobSearch = z.infer<typeof jobSearchSchema>

export const Route = createFileRoute('/_employee-layout/jobs')({
  component: JobsPage,
  validateSearch: (search) => jobSearchSchema.parse(search)
})

function JobsPage() {
  const { pageNumber, pageSize, search, status, sort } = Route.useSearch()

  const { data, isPending, error } = useJobs({ pageNumber, pageSize, search, status, sort })

  useEffect(() => {
    console.log({ error })
  }, [error])

  return (
    <section className='flex flex-col'>
      <h3 className='text-3xl font-semibold'>Jobs</h3>

      <div className='mt-5 rounded-2xl bg-card p-4'>
        <div className='mb-4 flex gap-x-8 border-b'>
          {jobTabs.map((tab) => {
            const active = status === tab.status

            return (
              <Link
                search={(prev) => ({ ...prev, status: tab.status })}
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

        <Table>
          <TableHeader className='rounded-lg bg-border'>
            <TableRow className='rounded-lg'>
              <TableHead className='h-10 rounded-l-lg'>Code</TableHead>
              <TableHead className='h-10 w-fit'>Job Name</TableHead>
              <TableHead className='h-10 text-center'>Status</TableHead>
              <TableHead className='h-10 rounded-r-lg text-end'>Job Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending && (
              <>
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={4} className='p-0'>
                        <Skeleton className='my-2 h-9 w-full' />
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}

            {data?.items.map((job) => (
              <TableRow key={job.id}>
                <TableCell className='font-extrabold'>{job.code}</TableCell>
                <TableCell className='flex items-center gap-x-3 font-semibold'>
                  <img alt='job' src={job.icon} className='size-8 object-cover' />
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
                <TableCell className='flex justify-end gap-x-4 text-right'>
                  <Button>Open Job</Button>
                  <Button>Add Exam</Button>
                  <Button variant='danger'>Update</Button>
                  <Button variant='ghost'>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default JobsPage
