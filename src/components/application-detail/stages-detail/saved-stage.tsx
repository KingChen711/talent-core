import { ApplicationStatus } from '@prisma/client'
import { XIcon } from 'lucide-react'

type Props = {
  hasTestSession: boolean
  hasInterviewSession: boolean
  status: ApplicationStatus
  isCandidateView: boolean
}

function SavedStage({ hasTestSession, status, hasInterviewSession, isCandidateView }: Props) {
  if (status !== 'Saved') return null

  const subject = isCandidateView ? 'You' : 'The candidate'

  return (
    <div className='z-10 flex items-center gap-x-2'>
      <div className='flex items-center gap-x-2'>
        <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-danger'>
          <XIcon className='size-5 text-black' />
        </div>

        <div className='flex w-28 shrink-0 flex-col gap-y-1'>
          <div className='line-clamp-1 flex flex-col font-bold leading-none'>Saved</div>
        </div>
      </div>

      {!hasTestSession ? (
        <div className='w-full rounded-lg bg-border p-4 font-medium'>{subject} has failed the screening stage.</div>
      ) : !hasInterviewSession ? (
        <div className='w-full rounded-lg bg-border p-4 font-medium'>{subject} has failed the testing stage.</div>
      ) : (
        <div className='w-full rounded-lg bg-border p-4 font-medium'>{subject} has failed the interviewing stage.</div>
      )}
    </div>
  )
}

export default SavedStage
