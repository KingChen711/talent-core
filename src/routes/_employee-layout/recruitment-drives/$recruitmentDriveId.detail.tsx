import JobDetailCard from '@/components/jobs/job-detail-card'
import NoResult from '@/components/shared/no-result'
import { Badge } from '@/components/ui/badge'
import useRecruitmentDriveDetail from '@/hooks/recruitment-drive/use-recruitment-drive-detail'
import { toDate, toDaysAgo } from '@/lib/utils'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/recruitment-drives/$recruitmentDriveId/detail')({
  component: RecruitmentDriveDetailPage
})

function RecruitmentDriveDetailPage() {
  const { recruitmentDriveId } = Route.useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useRecruitmentDriveDetail(recruitmentDriveId)

  if (isLoading) return <div>Skeleton</div>

  if (!data) {
    return (
      <NoResult
        title='No recruitment drive found.'
        description=''
        link='/recruitment-drives'
        linkTitle='Back to list'
      />
    )
  }

  return (
    <section>
      <div className='mb-5 space-y-1'>
        <div className='flex items-center gap-x-2'>
          <div className='text-2xl font-semibold'>{data.name}</div>
          {data.isOpening ? (
            <Badge className='text-sm font-extrabold' variant='success'>
              Opening
            </Badge>
          ) : (
            <Badge className='text-sm font-extrabold' variant='danger'>
              Closed
            </Badge>
          )}
        </div>
        <div className='text-xl text-muted'>
          {data.code}, {toDate(data.startDate)} - {toDate(data.endDate)}
        </div>
      </div>

      <div className='mb-2 text-xl font-semibold'>Jobs</div>
      <div className='grid w-full'>
        <div className='overflow-x-auto'>
          <div className='flex gap-x-6 pb-2'>
            {data.jobDetails.map((jd) => (
              <JobDetailCard
                key={jd.id}
                name={jd.job.name}
                color={jd.job.color}
                icon={jd.job.icon}
                quantity={jd.quantity}
                createdAt={jd.createdAt}
                countApplications={jd.applications.length}
                countApplicationsApproved={jd.countApplicationsApproved}
                countApplicationsLastWeek={jd.countApplicationsLastWeek}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='mb-2 mt-8 text-xl font-semibold'>Candidates</div>
    </section>
  )
}

export default RecruitmentDriveDetailPage
