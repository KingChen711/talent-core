import useRecruitmentDriveDetail, { JobDetails } from '@/hooks/recruitment-drive/use-recruitment-drive-detail'
import { toDate } from '@/lib/utils'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import JobDetailCard from '@/components/jobs/job-detail-card'
import NoResult from '@/components/shared/no-result'
import OpenCloseBadge from '@/components/shared/open-close-badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

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
          <h2 className='text-2xl font-semibold'>{data.name}</h2>
          <OpenCloseBadge isOpening={data.isOpening} />
        </div>
        <p className='text-xl text-muted'>
          {data.code}, {toDate(data.startDate)} - {toDate(data.endDate)}
        </p>
      </div>

      <div className='mb-2 flex items-center justify-between'>
        <div className='text-xl font-semibold'>Jobs</div>
        <Button size='sm' asChild>
          <Link to={`/recruitment-drives/${data.code}/add-jobs`}>
            <Plus className='mr-1 size-5' />
            Add Job
          </Link>
        </Button>
      </div>

      {data.jobDetails.length === 0 && (
        <div className='flex h-44 items-center justify-center rounded-md border text-xl font-medium'>
          No any jobs found
        </div>
      )}

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

      <div className='mb-2 mt-8 flex items-center justify-between'>
        <div className='text-xl font-semibold'>Candidates</div>
        <DialogSelectJobForAddCandidate recruitmentDriveCode={data.code} jobDetails={data.jobDetails} />
      </div>
    </section>
  )
}

export default RecruitmentDriveDetailPage

type DialogSelectJobForAddCandidateProps = {
  recruitmentDriveCode: string
  jobDetails: JobDetails
}

function DialogSelectJobForAddCandidate({ jobDetails, recruitmentDriveCode }: DialogSelectJobForAddCandidateProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size='sm'>
          <Plus className='mr-1 size-5' />
          Add Candidate
        </Button>
      </DialogTrigger>
      <DialogContent className='w-fit'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Select A Job Position</DialogTitle>
          <DialogDescription asChild>
            <ScrollArea className='max-h-[60dvh] px-[10px]'>
              <div className='space-y-4'>
                {jobDetails.map((jd) => (
                  <Link
                    to={`/recruitment-drives/${recruitmentDriveCode}/jobs/${jd.job.code}/add-candidate`}
                    key={jd.id}
                    className='block hover:opacity-70'
                  >
                    <JobDetailCard
                      name={jd.job.name}
                      color={jd.job.color}
                      icon={jd.job.icon}
                      quantity={jd.quantity}
                      createdAt={jd.createdAt}
                      countApplications={jd.applications.length}
                      countApplicationsApproved={jd.countApplicationsApproved}
                      countApplicationsLastWeek={jd.countApplicationsLastWeek}
                      showNavigate={false}
                    />
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
