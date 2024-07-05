import { Link, createFileRoute } from '@tanstack/react-router'

import TestExamForm from '@/components/forms/test-exam.form'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_employee-layout/test-exams/create')({
  component: CreateTestExamPage
})

function CreateTestExamPage() {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='mb-5 text-2xl font-semibold'>Create Test Exam</div>
        <Button>
          <Link
            to='/test-exams'
            search={() => ({
              pageNumber: 1,
              pageSize: 5,
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

      <TestExamForm type='create' />
    </div>
  )
}

export default CreateTestExamPage
