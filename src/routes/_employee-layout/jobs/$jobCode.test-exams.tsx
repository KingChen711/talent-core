import TableRowsSkeleton from '@/components/shared/table-rows-skeleton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import useJobRemoveTestExams from '@/hooks/job/use-job-remove-test-exams'
import useJobTestExams from '@/hooks/job/use-job-test-exams'
import { isBaseError, toDate } from '@/lib/utils'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useQueryClient } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'
import { Loader2, Search } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_employee-layout/jobs/$jobCode/test-exams')({
  component: JobTestExamsPage
})

function JobTestExamsPage() {
  // A job will not have to much test exams, not need to pagination,filter, sort at server, and just filter at client
  const queryClient = useQueryClient()
  const { jobCode } = Route.useParams()

  const { data, isLoading } = useJobTestExams(jobCode)
  const { mutate, isPending } = useJobRemoveTestExams()

  const [selectedTestExamIds, setSelectedTestExamIds] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleCheckedChange = (value: CheckedState, testExamId: string) => {
    const checked = value.valueOf() as boolean
    setSelectedTestExamIds((prev) => (checked ? [...prev, testExamId] : prev.filter((i) => i !== testExamId)))
  }

  const handleRemoveTestExams = () => {
    if (selectedTestExamIds.length === 0) return

    mutate(
      { jobCode, testExamIds: selectedTestExamIds },
      {
        onSuccess: () => {
          toast({
            title: `Test exams have been removed successfully`,
            variant: 'success'
          })

          queryClient.invalidateQueries({
            queryKey: ['jobs', jobCode, 'test-exams']
          })

          setSelectedTestExamIds([])
        },
        onError: (error) => {
          if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
            toast({
              title: `Test exams have been removed failure`,
              description: 'Some thing went wrong.',
              variant: 'danger'
            })

            return
          }

          toast({
            title: `Test exams have been removed failure`,
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
        <h3 className='mb-4 text-2xl font-semibold'>Test Exams of {jobCode}</h3>
        <div>{selectedTestExamIds.length} test exams have selected</div>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-x-4'>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className='flex items-center justify-end gap-x-4'>
          <Button
            onClick={handleRemoveTestExams}
            disabled={selectedTestExamIds.length === 0 || isPending}
            variant='secondary'
          >
            Remove {isPending && <Loader2 className='ml-1 size-4 animate-spin' />}
          </Button>
          <Button disabled={isPending} asChild>
            <Link to={`/jobs/${jobCode}/add-test-exams`} disabled={isPending}>
              Add Test Exams
            </Link>
          </Button>
        </div>
      </div>

      <div className='my-5 rounded-2xl bg-card p-4'>
        <div className='grid w-full'>
          <div className='overflow-x-auto'>
            <Table className='overflow-hidden'>
              <TableHeader className='rounded-lg bg-border'>
                <TableRow className='rounded-lg'>
                  <TableHead className='rounded-l-lg'></TableHead>
                  <TableHead className='h-10 cursor-pointer'>
                    <div className='flex items-center'>
                      <p className='select-none'>Code</p>
                    </div>
                  </TableHead>
                  <TableHead className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center'>
                      <p className='select-none text-nowrap'>Test Name</p>
                    </div>
                  </TableHead>
                  <TableHead className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center justify-center'>
                      <p className='select-none'>Condition Point</p>
                    </div>
                  </TableHead>
                  <TableHead className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center justify-center'>
                      <p className='select-none'>Duration</p>
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
                {isLoading && <TableRowsSkeleton colSpan={6} pageSize={6} />}

                {data
                  ?.filter((testExam) => {
                    return (
                      testExam.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      testExam.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  })
                  .map((testExam) => (
                    <TableRow key={testExam.id}>
                      <TableCell className=''>
                        <Checkbox
                          disabled={isPending}
                          onCheckedChange={(value) => handleCheckedChange(value, testExam.id)}
                          checked={selectedTestExamIds.includes(testExam.id)}
                        />
                      </TableCell>
                      <TableCell className='font-extrabold'>{testExam.code}</TableCell>
                      <TableCell>{testExam.name}</TableCell>
                      <TableCell className='text-center'>{testExam.conditionPoint}</TableCell>
                      <TableCell className='text-center'>{testExam.duration}</TableCell>
                      <TableCell className='text-center'>{toDate(testExam.createdAt)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {!isLoading && data?.length === 0 && (
          <div className='mt-36 text-center text-xl font-bold'>Not found any Test Exams.</div>
        )}
      </div>
    </section>
  )
}

export default JobTestExamsPage

type SearchBarProps = { searchTerm: string; setSearchTerm: React.Dispatch<React.SetStateAction<string>> }

function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className='flex max-w-md flex-1 items-center rounded-lg border-2 px-2'>
      <Search className='size-6' />
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='rounded-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
        placeholder='Search test exams...'
      />
    </div>
  )
}
