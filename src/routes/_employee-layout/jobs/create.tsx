import { Link, createFileRoute } from '@tanstack/react-router'

import JobForm from '@/components/forms/job.form'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_employee-layout/jobs/create')({
  component: CreateJobPage
})

function CreateJobPage() {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='mb-5 text-2xl font-semibold'>Create Job</div>
        <Button>
          <Link
            to='/jobs'
            search={() => ({
              pageNumber: 1,
              pageSize: 5,
              search: '',
              status: 'All',
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

      <JobForm type='create' />
    </div>
  )
}

export default CreateJobPage
