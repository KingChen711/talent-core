import { testExamsPageSize } from '@/constants'
import { Link, createFileRoute } from '@tanstack/react-router'

import TestExamForm from '@/components/forms/test-exam.form'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_employee-layout/test-exams/$testExamId/edit')({
  component: EditTestExamPage
})

function EditTestExamPage() {
  const { testExamId } = Route.useParams()

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='mb-5 text-2xl font-semibold'>Edit Test Exam</div>
        <Button>
          <Link
            to='/test-exams'
            search={() => ({
              pageNumber: 1,
              pageSize: testExamsPageSize,
              search: '',
              status: 'all',
              sort: '-createdAt'
            })}
            className='flex items-center gap-x-1'
          >
            <>
              <img className='size-5' src='/icons/actions/back.svg' />
              Back to list
            </>
          </Link>
        </Button>
      </div>

      <TestExamForm type='update' testExamId={testExamId} />
    </div>
  )
}

export default EditTestExamPage
