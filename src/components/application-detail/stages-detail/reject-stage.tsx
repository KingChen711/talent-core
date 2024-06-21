import { ApplicationStatus } from '@prisma/client'
import { XIcon } from 'lucide-react'

type Props = {
  jobName: string
  status: ApplicationStatus
}

function RejectStage({ jobName, status }: Props) {
  if (status !== 'Reject') return null

  return (
    <div className='z-10 flex items-center gap-x-2'>
      <div className='flex items-center gap-x-2'>
        <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-danger'>
          <XIcon className='size-5 text-black' />
        </div>

        <div className='flex w-28 shrink-0 flex-col gap-y-1'>
          <div className='line-clamp-1 flex flex-col font-bold leading-none'>Reject</div>
        </div>
      </div>

      <div className='w-full rounded-lg bg-border p-4 font-medium'>
        The candidate has been rejected to be hired for {jobName} position.
      </div>
    </div>
  )
}

export default RejectStage
