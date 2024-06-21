import ApproveStage from './approve-stage'
import HiredStage from './hired-stage'
import InterviewingStage from './interviewing-stage'
import RejectStage from './reject-stage'
import SavedStage from './saved-stage'
import ScreeningStage from './screening-stage'
import TestingStage from './testing-stage'
import React from 'react'

import { ApplicationDetail } from '@/hooks/application/use-application'

type Props = {
  application: ApplicationDetail
  isCandidateView?: boolean
}

const StagesDetail = React.forwardRef<HTMLDivElement, Props>(({ application, isCandidateView = false }, ref) => {
  const applicationStatus = application.status

  return (
    <div ref={ref} className='relative flex flex-col gap-y-6'>
      <div className='absolute left-5 z-0 h-full min-h-[300px] w-0 -translate-x-1/2 border-2 border-dashed border-muted-foreground' />

      <ScreeningStage
        isCandidateView={isCandidateView}
        createdAt={application.createdAt}
        status={applicationStatus}
        jobName={application.jobDetail.job.name}
      />

      <TestingStage
        isCandidateView={isCandidateView}
        testSession={application.testSession}
        applicationId={application.id}
        jobCode={application.jobDetail.job.code}
        status={applicationStatus}
      />

      <InterviewingStage
        isCandidateView={isCandidateView}
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
})

StagesDetail.displayName = 'StagesDetail'

export default StagesDetail