import TableRowsSkeleton from '@/components/shared/table-rows-skeleton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import useTestExamJobs from '@/hooks/test-exam/use-test-exam-jobs'
import useTestExamRemoveJobs from '@/hooks/test-exam/use-test-exam-remove-jobs'
import { isAxiosError, toDate } from '@/lib/utils'
import { ErrorResponse } from '@/types'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useQueryClient } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'
import { Search } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_employee-layout/test-exams/$testExamCode/jobs')({
  component: TestExamJobsPage
})

function TestExamJobsPage() {
  // A test exam will not have to much jobs, not need to pagination,filter, sort at server, and just filter at client
  const queryClient = useQueryClient()
  const { testExamCode } = Route.useParams()

  const [selectedJobIds, setSelectedJobIds] = useState<string[]>([])

  const { data, isLoading } = useTestExamJobs(testExamCode)
  const { mutate, isPending } = useTestExamRemoveJobs()

  const [searchTerm, setSearchTerm] = useState('')

  const handleCheckedChange = (value: CheckedState, testExamId: string) => {
    const checked = value.valueOf() as boolean
    setSelectedJobIds((prev) => (checked ? [...prev, testExamId] : prev.filter((i) => i !== testExamId)))
  }

  const handleRemoveJobs = () => {
    if (selectedJobIds.length === 0) return

    mutate(
      { testExamCode, jobIds: selectedJobIds },
      {
        onSuccess: () => {
          toast({
            title: `Jobs have been removed successfully`,
            variant: 'success'
          })

          queryClient.invalidateQueries({
            queryKey: ['test-exams', testExamCode, 'jobs']
          })

          setSelectedJobIds([])
        },
        onError: (error) => {
          if (!isAxiosError<ErrorResponse>(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
            toast({
              title: `Jobs have been removed failure`,
              description: 'Some thing went wrong.',
              variant: 'danger'
            })

            return
          }

          toast({
            title: `Jobs have been removed failure`,
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
        <h3 className='mb-4 text-2xl font-semibold'>Jobs of {testExamCode}</h3>
        <div>{selectedJobIds.length} jobs have selected</div>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-x-4'>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className='flex items-center justify-end gap-x-4'>
          <Button onClick={handleRemoveJobs} disabled={selectedJobIds.length === 0 || isPending} variant='secondary'>
            <Link to={`/test-exams/${testExamCode}/jobs`} disabled={isPending}>
              Remove
            </Link>
          </Button>
          <Button disabled={isPending} asChild>
            <Link to={`/test-exams/${testExamCode}/add-jobs`}>Add Test Exams</Link>
          </Button>
        </div>
      </div>

      <div className='my-5 rounded-2xl bg-card p-4'>
        <div className='grid w-full'>
          <div className='overflow-x-auto'>
            <Table className='overflow-hidden'>
              <TableHeader className='rounded-lg bg-border'>
                <TableRow className='rounded-lg'>
                  <TableHead className=''></TableHead>
                  <TableHead className='h-10 cursor-pointer rounded-l-lg'>
                    <div className='flex items-center'>
                      <p className='select-none'>Code</p>
                    </div>
                  </TableHead>
                  <TableHead className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center'>
                      <p className='select-none text-nowrap'>Job Name</p>
                    </div>
                  </TableHead>
                  <TableHead className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center justify-center'>
                      <p className='select-none'>Created At</p>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && <TableRowsSkeleton colSpan={5} pageSize={5} />}

                {data?.map((job) => (
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

        {!isLoading && data?.length === 0 && (
          <div className='mt-36 text-center text-xl font-bold'>Not found any Jobs.</div>
        )}
      </div>
    </section>
  )
}

export default TestExamJobsPage

type SearchBarProps = { searchTerm: string; setSearchTerm: React.Dispatch<React.SetStateAction<string>> }

function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className='flex max-w-md flex-1 items-center rounded-lg border-2 px-2'>
      <Search className='size-6' />
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='rounded-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
        placeholder='Search jobs...'
      />
    </div>
  )
}
