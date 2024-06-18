import ApproveStage from './approve-stage'
import HiredStage from './hired-stage'
import InterviewingStage from './interviewing-stage'
import RejectStage from './reject-stage'
import SavedStage from './saved-stage'
import ScreeningStage from './screening-stage'
import TestingStage from './testing-stage'
import { ApplicationStatus } from '@prisma/client'

import { ApplicationDetail } from '@/hooks/application/use-application'

type Props = {
  application: ApplicationDetail
}

function StagesDetail({ application }: Props) {
  const applicationStatus: ApplicationStatus = application.status

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
        interviewSessionStatus={application.interviewSession?.status}
        applicationId={application.id}
        receiveJobSession={application.receiveJobSession}
        status={applicationStatus}
      />

      <HiredStage
        jobName={application.jobDetail.job.name}
        applicationId={application.id}
        receiveJobSession={application.receiveJobSession}
        status={applicationStatus}
      />

      <SavedStage
        status={applicationStatus}
        hasTestSession={!!application.testSession?.testDate}
        hasInterviewSession={!!application.interviewSession?.interviewDate}
      />

      <RejectStage jobName={application.jobDetail.job.name} status={applicationStatus} />
    </div>
  )
}

export default StagesDetail
