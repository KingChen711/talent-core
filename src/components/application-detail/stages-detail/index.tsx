import ApproveStage from './approve-stage'
import HiredStage from './hired-stage'
import InterviewingStage from './interviewing-stage'
import RejectStage from './reject-stage'
import SavedStage from './saved-stage'
import ScreeningStage from './screening-stage'
import TestingStage from './testing-stage'
import React from 'react'

import { ApplicationDetail } from '@/hooks/application/use-application'

import { Skeleton } from '@/components/ui/skeleton'

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
        isCandidateView={isCandidateView}
        interviewSessionStatus={application.interviewSession?.status}
        applicationId={application.id}
        receiveJobSession={application.receiveJobSession}
        status={applicationStatus}
      />

      <HiredStage
        isCandidateView={isCandidateView}
        jobName={application.jobDetail.job.name}
        applicationId={application.id}
        receiveJobSession={application.receiveJobSession}
        status={applicationStatus}
      />

      <SavedStage
        isCandidateView={isCandidateView}
        status={applicationStatus}
        hasTestSession={!!application.testSession?.testDate}
        hasInterviewSession={!!application.interviewSession?.interviewDate}
      />

      <RejectStage
        isCandidateView={isCandidateView}
        jobName={application.jobDetail.job.name}
        status={applicationStatus}
      />
    </div>
  )
})

StagesDetail.displayName = 'StagesDetail'

export default StagesDetail

export function StagesDetailSkeleton() {
  return (
    <div className='relative flex flex-col gap-y-6'>
      <div className='absolute left-5 z-0 h-full w-0 -translate-x-1/2 border-2 border-dashed border-muted-foreground' />
      <StageSkeleton />
      <StageSkeleton />
      <StageSkeleton />
      <StageSkeleton />
      <StageSkeleton />
    </div>
  )
}

export function StageSkeleton() {
  return (
    <div className='z-10 flex items-center gap-x-2'>
      <div className='flex items-center gap-x-2'>
        <Skeleton className='size-10 shrink-0 rounded-full bg-muted'></Skeleton>
        <div className='flex w-28 shrink-0 flex-col gap-y-1'>
          <Skeleton className='h-4 w-24'></Skeleton>
          <Skeleton className='h-3 w-24'></Skeleton>
        </div>
      </div>
      <Skeleton className='h-20 w-full bg-muted'></Skeleton>
    </div>
  )
}
