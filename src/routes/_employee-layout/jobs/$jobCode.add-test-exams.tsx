import { Link, createFileRoute } from '@tanstack/react-router'

import useJobAddableTestExams from '@/hooks/job/use-job-addable-test-exams'
import useSort from '@/hooks/query/use-sort'
import { toDate } from '@/lib/utils'
import { testExamSearchSchema } from '@/lib/validation/job.validation'

import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import TableRowsSkeleton from '@/components/shared/table-rows-skeleton'
import Paginator from '@/components/shared/paginator'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckedState } from '@radix-ui/react-checkbox'

export const Route = createFileRoute('/_employee-layout/jobs/$jobCode/add-test-exams')({
  component: JobAddTestExamsPage,
  validateSearch: (search) => testExamSearchSchema.parse(search)
})

function JobAddTestExamsPage() {
  const { jobCode } = Route.useParams()

  const [selectedTestExamIds, setSelectedTestExamIds] = useState<string[]>([])

  const { pageNumber, pageSize, search, sort } = Route.useSearch()

  const { Icon: CodeSortIcon, sorter: handleSortByCode } = useSort({ key: 'code', sortParams: sort })
  const { Icon: NameSortIcon, sorter: handleSortByName } = useSort({ key: 'name', sortParams: sort })
  const { Icon: CreatedAtSortIcon, sorter: handleSortByCreatedAt } = useSort({ key: 'createdAt', sortParams: sort })
  const { Icon: DurationSortIcon, sorter: handleSortByDuration } = useSort({ key: 'duration', sortParams: sort })
  const { Icon: ConditionPointSortIcon, sorter: handleSortByConditionPoint } = useSort({
    key: 'conditionPoint',
    sortParams: sort
  })

  const { data, isPending } = useJobAddableTestExams(jobCode, { pageNumber, pageSize, search, sort })

  const handleCheckedChange = (value: CheckedState, testExamId: string) => {
    const checked = value.valueOf() as boolean
    setSelectedTestExamIds((prev) => (checked ? [...prev, testExamId] : prev.filter((i) => i !== testExamId)))
  }

  return (
    <section className='flex flex-col'>
      <div className='flex items-center justify-between gap-x-5'>
        <h3 className='mb-4 text-2xl font-semibold'>Add test exams to {jobCode}</h3>
        <div>{selectedTestExamIds.length} test exams have selected</div>
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
                {isPending && <TableRowsSkeleton colSpan={6} pageSize={pageSize} />}

                {data?.items.map((testExam) => (
                  <TableRow key={testExam.id}>
                    <TableCell className=''>
                      <Checkbox
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

        {!isPending && data?.items.length === 0 && (
          <div className='mt-36 text-center text-xl font-bold'>Not found any Test Exams.</div>
        )}
      </div>

      {data && data.items.length > 0 && <Paginator metadata={data.metadata} />}

      <div className='flex items-center justify-end gap-x-4'>
        <Button variant='secondary'>
          <Link to={`/jobs/${jobCode}/test-exams`}>Cancel</Link>
        </Button>
        <Button disabled={selectedTestExamIds.length === 0}>Add Test Exams</Button>
      </div>
    </section>
  )
}

export default JobAddTestExamsPage
