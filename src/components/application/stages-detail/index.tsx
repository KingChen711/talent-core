import ApproveStage from './approve-stage'
import InterviewingStage from './interviewing-stage'
import ScreeningStage from './screening-stage'
import TestingStage from './testing-stage'
import { ApplicationStatus } from '@prisma/client'

import { ApplicationDetail } from '@/hooks/application/use-application'

type Props = {
  application: ApplicationDetail
}

function StagesDetail({ application }: Props) {
  const applicationStatus: ApplicationStatus = application.status
  // const applicationStatus: ApplicationStatus = 'Screening'
  return (
    <div className='relative flex flex-col gap-y-6'>
      <div className='absolute left-5 z-0 h-full w-0 -translate-x-1/2 border-2 border-dashed border-muted-foreground' />

      <ScreeningStage
        createdAt={application.createdAt}
        status={applicationStatus}
        jobName={application.jobDetail.job.name}
      />

      <TestingStage
        testSession={application.testSession}
        applicationId={application.id}
        jobCode={application.jobDetail.job.code}
        status={applicationStatus}
      />

      <InterviewingStage
        applicationId={application.id}
        testSessionStatus={application.testSession?.status}
        status={applicationStatus}
        interviewSession={application.interviewSession}
      />

      <ApproveStage
        applicationId={application.id}
        testSessionStatus={application.testSession?.status}
        status={applicationStatus}
      />
    </div>
  )
}

export default StagesDetail
