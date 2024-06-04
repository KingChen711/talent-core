import NoResult from '@/components/shared/no-result'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import useRecruitmentDriveDetail from '@/hooks/recruitment-drive/use-recruitment-drive-detail'
import { toDaysAgo } from '@/lib/utils'
import { NotFoundRoute, createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/recruitment-drives/$recruitmentDriveId/detail')({
  component: RecruitmentDriveDetailPage
})

function RecruitmentDriveDetailPage() {
  const { recruitmentDriveId } = Route.useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useRecruitmentDriveDetail(recruitmentDriveId)

  if (isLoading) return <div>Skeleton</div>

  if (!isLoading && !data) {
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
      <div className='mb-5 text-2xl font-semibold'>Recruitment Drive Details</div>

      <div className='mb-2 text-xl font-semibold'>Jobs</div>
      <div className='grid w-full'>
        <div className='overflow-x-scroll'>
          <div className='flex gap-x-6 pb-3'>
            {data?.jobDetails.map((jd) => (
              <div
                style={{
                  borderColor: jd.job.color
                }}
                key={jd.id}
                className='relative flex w-72 shrink-0 flex-col gap-y-3 overflow-hidden rounded-2xl border-l-[5px] bg-card px-[10px] py-4'
              >
                <div className='absolute right-2 top-2 z-10 flex size-11 items-center justify-center rounded-full bg-white/10'>
                  <img className='size-5' src='/icons/actions/navigate.svg' />
                </div>

                <div
                  style={{
                    backgroundColor: jd.job.color,
                    // background: `radial-gradient(circle, ${jd.job.color}40, ${jd.job.color}40)`,
                    boxShadow: `0 0 90px 90px ${jd.job.color}30`
                  }}
                  className='absolute right-0 top-0 z-0 size-0'
                ></div>

                <div className='z-10 flex w-[215px] items-center gap-x-3'>
                  <img className='size-12 object-cover' src={jd.job.icon} />
                  <div className='flex flex-col gap-y-1'>
                    <h4 className='line-clamp-1 text-lg font-bold'>{jd.job.name}</h4>
                    <p className='text-xs text-muted'>{toDaysAgo(jd.createdAt)}</p>
                  </div>
                </div>

                <div className='z-10 flex gap-x-2'>
                  <Badge variant='secondary' className='w-fit bg-[#282828] py-1 text-sm font-normal'>
                    {jd.countApplicationsAccepted} approved
                  </Badge>
                  <Badge variant='secondary' className='w-fit bg-[#282828] py-1 text-sm font-normal'>
                    {jd.quantity} needed
                  </Badge>
                </div>

                <div className='z-10 flex items-end justify-between'>
                  <div className='ml-1 flex items-end gap-x-2'>
                    <p className='text-[40px] font-bold leading-none'>{jd.applications.length}</p>
                    <p className='mb-[6px] text-sm text-muted'>applications</p>
                  </div>

                  <div className='mb-[6px] text-sm text-success'>{jd.countApplicationsLastWeek} in last week</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecruitmentDriveDetailPage
