import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'

import useJobAddableTestExams from '@/hooks/job/use-job-addable-test-exams'
import useSort from '@/hooks/query/use-sort'
import { isAxiosError, toDate } from '@/lib/utils'

import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import TableRowsSkeleton from '@/components/shared/table-rows-skeleton'
import Paginator from '@/components/shared/paginator'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckedState } from '@radix-ui/react-checkbox'
import useJobAddTestExam from '@/hooks/job/use-job-add-test-exams'
import { toast } from '@/components/ui/use-toast'
import { StatusCodes } from 'http-status-codes'
import { ErrorResponse } from '@/types'
import SearchForm from '@/components/shared/search-form'
import { testExamSearchSchema } from '@/lib/validation/test-exam.validation'

export const Route = createFileRoute('/_employee-layout/jobs/$jobCode/add-test-exams')({
  component: JobAddTestExamsPage,
  validateSearch: (search) => testExamSearchSchema.parse(search)
})

function JobAddTestExamsPage() {
  const navigate = useNavigate()

  const { jobCode } = Route.useParams()
  const { pageNumber, pageSize, search, sort } = Route.useSearch()

  const [selectedTestExamIds, setSelectedTestExamIds] = useState<string[]>([])

  const { Icon: CodeSortIcon, sorter: handleSortByCode } = useSort({ key: 'code', sortParams: sort })
  const { Icon: NameSortIcon, sorter: handleSortByName } = useSort({ key: 'name', sortParams: sort })
  const { Icon: CreatedAtSortIcon, sorter: handleSortByCreatedAt } = useSort({ key: 'createdAt', sortParams: sort })
  const { Icon: DurationSortIcon, sorter: handleSortByDuration } = useSort({ key: 'duration', sortParams: sort })
  const { Icon: ConditionPointSortIcon, sorter: handleSortByConditionPoint } = useSort({
    key: 'conditionPoint',
    sortParams: sort
  })

  const { data, isLoading } = useJobAddableTestExams(jobCode, { pageNumber, pageSize, search, sort })

  const { mutate, isPending } = useJobAddTestExam()

  const handleCheckedChange = (value: CheckedState, testExamId: string) => {
    const checked = value.valueOf() as boolean
    setSelectedTestExamIds((prev) => (checked ? [...prev, testExamId] : prev.filter((i) => i !== testExamId)))
  }

  const handleAddTestExams = () => {
    if (selectedTestExamIds.length === 0) return

    mutate(
      { jobCode, testExamIds: selectedTestExamIds },
      {
        onSuccess: () => {
          toast({
            title: `Test exams have been added successfully`,
            variant: 'success'
          })

          return navigate({
            to: `/jobs/${jobCode}/test-exams`
          })
        },
        onError: (error) => {
          if (!isAxiosError<ErrorResponse>(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
            toast({
              title: `Test exams have been added failure`,
              description: 'Some thing went wrong.',
              variant: 'danger'
            })

            return
          }

          toast({
            title: `Test exams have been added failure`,
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
        <h3 className='mb-4 text-2xl font-semibold'>Add test exams to {jobCode}</h3>
        <div>{selectedTestExamIds.length} test exams have selected</div>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-x-4'>
        <SearchForm search={search} placeholder='Search test exams' />
        <div className='flex items-center justify-end gap-x-4'>
          <Button variant='secondary'>
            <Link to={`/jobs/${jobCode}/test-exams`} disabled={isPending}>
              Cancel
            </Link>
          </Button>
          <Button onClick={handleAddTestExams} disabled={selectedTestExamIds.length === 0 || isPending}>
            Add Test Exams
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
                  <TableHead onClick={handleSortByCode} className='h-10 cursor-pointer rounded-l-lg'>
                    <div className='flex items-center'>
                      <p className='select-none'>Code</p>
                      <CodeSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByName} className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center'>
                      <p className='select-none text-nowrap'>Test Name</p>
                      <NameSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByConditionPoint} className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center justify-center'>
                      <p className='select-none'>Condition Point</p>
                      <ConditionPointSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByDuration} className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center justify-center'>
                      <p className='select-none'>Duration</p>
                      <DurationSortIcon />
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
                {isLoading && <TableRowsSkeleton colSpan={6} pageSize={pageSize} />}

                {data?.items.map((testExam) => (
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

        {!isLoading && data?.items.length === 0 && (
          <div className='mt-36 text-center text-xl font-bold'>Not found any Test Exams.</div>
        )}
      </div>

      {data && data.items.length > 0 && <Paginator metadata={data.metadata} />}
    </section>
  )
}

export default JobAddTestExamsPage
