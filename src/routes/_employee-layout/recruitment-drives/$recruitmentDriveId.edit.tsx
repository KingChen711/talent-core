import RecruitmentDriveForm from '@/components/forms/recruitment-drive.form'
import { Button } from '@/components/ui/button'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/recruitment-drives/$recruitmentDriveId/edit')({
  component: UpdateRecruitmentDrivePage
})

function UpdateRecruitmentDrivePage() {
  const { recruitmentDriveId } = Route.useParams()

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='mb-5 text-2xl font-semibold'>Edit Recruitment Drive</div>
        <Button>
          <Link
            to='/recruitment-drives'
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

      <RecruitmentDriveForm type='update' recruitmentDriveId={recruitmentDriveId} />
    </div>
  )
}

export default UpdateRecruitmentDrivePage
