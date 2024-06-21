import WishChangeInterviewDate from './wish-change-interview-date'
import WishChangeReceiveJobDate from './wish-change-receive-job-date'
import WishChangeTestDate from './wish-change-test-date'

import { ApplicationDetail } from '@/hooks/application/use-application'

type Props = { application: ApplicationDetail; isCandidateView?: boolean }

function CandidateRequests({ isCandidateView = false, application }: Props) {
  const testSessionWish = application.testSession?.testSessionWish
  const interviewSessionWish = application.interviewSession?.interviewSessionWish
  const receiveJobSessionWish = application.receiveJobSession?.receiveJobSessionWish

  if (!testSessionWish && !interviewSessionWish && !receiveJobSessionWish) {
    return <div>Not found any requests</div>
  }

  return (
    <div className='flex max-h-full flex-col gap-y-4 overflow-y-auto'>
      {testSessionWish && (
        <WishChangeTestDate
          isCandidateView={isCandidateView}
          applicationId={application.id}
          testSessionWish={testSessionWish}
        />
      )}
      {interviewSessionWish && (
        <WishChangeInterviewDate
          isCandidateView={isCandidateView}
          applicationId={application.id}
          interviewSessionWish={interviewSessionWish}
        />
      )}

      {receiveJobSessionWish && (
        <WishChangeReceiveJobDate
          isCandidateView={isCandidateView}
          applicationId={application.id}
          receiveJobSessionWish={receiveJobSessionWish}
        />
      )}
    </div>
  )
}

export default CandidateRequests
