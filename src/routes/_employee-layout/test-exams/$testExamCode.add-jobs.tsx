import Paginator from '@/components/shared/paginator'
import SearchForm from '@/components/shared/search-form'
import TableRowsSkeleton from '@/components/shared/table-rows-skeleton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { jobTabs } from '@/constants'
import useSort from '@/hooks/query/use-sort'
import useTestExamAddJobs from '@/hooks/test-exam/use-test-exam-add-jobs'
import useTestExamAddableJobs from '@/hooks/test-exam/use-test-exam-addable-jobs'
import { cn, isBaseError, toDate } from '@/lib/utils'
import { jobSearchSchema } from '@/lib/validation/job.validation'
import { CheckedState } from '@radix-ui/react-checkbox'
import { Link, createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_employee-layout/test-exams/$testExamCode/add-jobs')({
  component: TestExamAddJobsPage,
  validateSearch: (search) => jobSearchSchema.parse(search)
})

function TestExamAddJobsPage() {
  const router = useRouter()
  const navigate = useNavigate()
  const [selectedJobIds, setSelectedJobIds] = useState<string[]>([])

  const { testExamCode } = Route.useParams()
  const { pageNumber, pageSize, search, sort, status } = Route.useSearch()

  const { Icon: CodeSortIcon, sorter: handleSortByCode } = useSort({ key: 'code', sortParams: sort })
  const { Icon: NameSortIcon, sorter: handleSortByName } = useSort({ key: 'name', sortParams: sort })
  const { Icon: CreatedAtSortIcon, sorter: handleSortByCreatedAt } = useSort({ key: 'createdAt', sortParams: sort })

  const { data, isLoading } = useTestExamAddableJobs(testExamCode, { pageNumber, pageSize, search, sort, status })

  const { mutate, isPending } = useTestExamAddJobs()

  const handleCheckedChange = (value: CheckedState, testExamId: string) => {
    const checked = value.valueOf() as boolean
    setSelectedJobIds((prev) => (checked ? [...prev, testExamId] : prev.filter((i) => i !== testExamId)))
  }

  const handleAddTestExams = () => {
    if (setSelectedJobIds.length === 0) return

    mutate(
      { testExamCode, jobIds: selectedJobIds },
      {
        onSuccess: () => {
          toast({
            title: `Jobs have been added successfully`,
            variant: 'success'
          })

          return navigate({
            to: `/test-exams/${testExamCode}/jobs`
          })
        },
        onError: (error) => {
          if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
            toast({
              title: `Jobs have been added failure`,
              description: 'Some thing went wrong.',
              variant: 'danger'
            })

            return
          }

          toast({
            title: `Jobs have been added failure`,
            description: error.response?.data.message,
            variant: 'danger'
          })
        }
      }
    )
  }

  return (
    <section className='flex flex-col'>
      <div className='flex items-center justify-between gap-x-5'>
        <h3 className='mb-4 text-2xl font-semibold'>Add jobs to {testExamCode}</h3>
        <div>{selectedJobIds.length} jobs have selected</div>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-x-4'>
        <SearchForm search={search} placeholder='Search jobs...' />
        <div className='flex items-center justify-end gap-x-4'>
          <Button variant='secondary' disabled={isPending} onClick={() => router.history.back()}>
            Cancel
          </Button>
          <Button onClick={handleAddTestExams} disabled={selectedJobIds.length === 0 || isPending}>
            Add Jobs {isPending && <Loader2 className='ml-1 size-4 animate-spin' />}
          </Button>
        </div>
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
                  <TableHead className=''></TableHead>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && <TableRowsSkeleton colSpan={5} pageSize={pageSize} />}

                {data?.items.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className=''>
                      <Checkbox
                        disabled={isLoading}
                        onCheckedChange={(value) => handleCheckedChange(value, job.id)}
                        checked={selectedJobIds.includes(job.id)}
                      />
                    </TableCell>
                    <TableCell className='font-extrabold'>{job.code}</TableCell>
                    <TableCell className='flex items-center gap-x-3 font-semibold'>
                      <img alt='job' src={job.icon} className='size-8 rounded-md object-cover' />
                      <p>{job.name}</p>
                    </TableCell>

                    <TableCell className='text-center'>{toDate(job.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {!isLoading && data?.items.length === 0 && (
          <div className='mt-36 text-center text-xl font-bold'>Not found any Jobs.</div>
        )}
      </div>

      {data && data.items.length > 0 && <Paginator metadata={data.metadata} />}
    </section>
  )
}

export default TestExamAddJobsPage
