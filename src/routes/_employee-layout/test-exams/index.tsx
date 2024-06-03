import { toDate } from '@/lib/utils'
import useTestExams from '@/hooks/test-exam/use-test-exams'
import useSort from '@/hooks/query/use-sort'
import { Link, createFileRoute } from '@tanstack/react-router'

import { Plus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Paginator from '@/components/shared/paginator'
import SearchForm from '@/components/shared/search-form'
import { Button } from '@/components/ui/button'
import TableRowsSkeleton from '@/components/shared/table-rows-skeleton'
import DialogDeleteTestExam from '@/components/test-exams/dialog-delete-test-exam'
import DropdownSettingTestExam from '@/components/test-exams/dropdown-setting-test-exam'
import { testExamSearchSchema } from '@/lib/validation/test-exam.validation'

export const Route = createFileRoute('/_employee-layout/test-exams/')({
  component: TestExamsPage,
  validateSearch: (search) => testExamSearchSchema.parse(search)
})

function TestExamsPage() {
  const { pageNumber, pageSize, search, sort } = Route.useSearch()

  const { Icon: CodeSortIcon, sorter: handleSortByCode } = useSort({ key: 'code', sortParams: sort })
  const { Icon: NameSortIcon, sorter: handleSortByName } = useSort({ key: 'name', sortParams: sort })
  const { Icon: CreatedAtSortIcon, sorter: handleSortByCreatedAt } = useSort({ key: 'createdAt', sortParams: sort })
  const { Icon: DurationSortIcon, sorter: handleSortByDuration } = useSort({ key: 'duration', sortParams: sort })
  const { Icon: ConditionPointSortIcon, sorter: handleSortByConditionPoint } = useSort({
    key: 'conditionPoint',
    sortParams: sort
  })

  const { data, isPending } = useTestExams({ pageNumber, pageSize, search, sort })

  return (
    <section className='flex flex-col'>
      <div className='flex items-center justify-between gap-x-5'>
        <h3 className='text-2xl font-semibold'>Test Exams</h3>
        <SearchForm search={search} placeholder='Search test exams...' />
        <Button asChild>
          <Link to='/test-exams/create'>
            <Plus className='mr-1 size-5' />
            Create Test Exam
          </Link>
        </Button>
      </div>

      <div className='my-5 rounded-2xl bg-card p-4'>
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
                  <TableHead className='h-10 select-none text-nowrap rounded-r-lg text-end'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending && <TableRowsSkeleton colSpan={6} pageSize={pageSize} />}

                {data?.items.map((testExam) => (
                  <TableRow key={testExam.id}>
                    <TableCell className='font-extrabold'>{testExam.code}</TableCell>
                    <TableCell>{testExam.name}</TableCell>
                    <TableCell className='text-center'>{testExam.conditionPoint}</TableCell>
                    <TableCell className='text-center'>{testExam.duration}</TableCell>
                    <TableCell className='text-center'>{toDate(testExam.createdAt)}</TableCell>
                    <TableCell className='flex justify-end'>
                      <DropdownSettingTestExam testExamId={testExam.id} testExamCode={testExam.code} />
                      <DialogDeleteTestExam testExamId={testExam.id} />
                    </TableCell>
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
    </section>
  )
}

export default TestExamsPage
