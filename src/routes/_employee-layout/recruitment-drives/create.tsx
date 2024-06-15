import RecruitmentDriveForm from '@/components/forms/recruitment-drive.form'
import { Button } from '@/components/ui/button'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/recruitment-drives/create')({
  component: CreateRecruitmentDrivePage
})

function CreateRecruitmentDrivePage() {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='mb-5 text-2xl font-semibold'>Create Recruitment Drive</div>
        <Button>
          <Link
            to='/recruitment-drives'
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

      <RecruitmentDriveForm type='create' />
    </div>
  )
}

export default CreateRecruitmentDrivePage
