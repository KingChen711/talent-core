import { cn, toDate, toDateTime } from '@/lib/utils'
import { ApplicationStatus } from '@prisma/client'

type Props = {
  status: ApplicationStatus
  createdAt: Date
  jobName: string
}

function ScreeningStage({ createdAt, status, jobName }: Props) {
  return (
    <div className='z-10 flex items-center gap-x-2'>
      <div className='flex items-center gap-x-2'>
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full',
            status === 'Screening' ? 'bg-warning' : 'bg-success'
          )}
        >
          <img
            alt='progress'
            src={status === 'Screening' ? '/icons/hourglass.svg' : '/icons/check.svg'}
            className='size-5'
          />
        </div>
        <div className='flex w-28 shrink-0 flex-col gap-y-1'>
          <div className='line-clamp-1 flex flex-col font-bold leading-none'>Screening</div>
          <div className='line-clamp-1 text-xs leading-none text-muted-foreground'>{toDate(createdAt)}</div>
        </div>
      </div>
      <div className='line-clamp-2 w-full rounded-lg bg-border p-4 font-medium'>
        The candidate applied for the {jobName} position in {toDateTime(createdAt)}.
      </div>
    </div>
  )
}

export default ScreeningStage
