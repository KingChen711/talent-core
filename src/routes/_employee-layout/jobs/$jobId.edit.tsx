import JobForm from '@/components/forms/job.form'
import { Button } from '@/components/ui/button'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/jobs/$jobId/edit')({
  component: EditJobPage
})

function EditJobPage() {
  const { jobId } = Route.useParams()

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='mb-5 text-3xl font-semibold'>Edit Job</div>
        <Button>
          <Link
            to='/jobs'
            search={() => ({
              pageNumber: 1,
              pageSize: 5,
              search: '',
              status: 'all'
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

      <JobForm type='update' jobId={jobId} />
    </div>
  )
}

export default EditJobPage
