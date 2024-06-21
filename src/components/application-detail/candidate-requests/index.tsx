import WishChangeInterviewDate from './wish-change-interview-date'
import WishChangeTestDate from './wish-change-test-date'

import { ApplicationDetail } from '@/hooks/application/use-application'

type Props = { application: ApplicationDetail; isCandidateView?: boolean }

function CandidateRequests({ isCandidateView = false, application }: Props) {
  return (
    <div className='flex max-h-full flex-col gap-y-4 overflow-y-auto'>
      {application.testSession?.testSessionWish && (
        <WishChangeTestDate
          isCandidateView={isCandidateView}
          applicationId={application.id}
          testSessionWish={application.testSession.testSessionWish}
        />
      )}
      {application.interviewSession?.interviewSessionWish && (
        <WishChangeInterviewDate
          isCandidateView={isCandidateView}
          applicationId={application.id}
          interviewSessionWish={application.interviewSession.interviewSessionWish}
        />
      )}
    </div>
  )
}

export default CandidateRequests
