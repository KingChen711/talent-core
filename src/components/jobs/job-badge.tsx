import { JobStatus } from '@/hooks/job/use-jobs'
import { Badge } from '../ui/badge'

type Props = {
  status: JobStatus
}

function JobBadge({ status }: Props) {
  return (
    <div className='flex items-center gap-x-3'>
      {status.map((s) => (
        <Badge
          key={s}
          className='flex w-[90px] justify-center text-sm font-extrabold'
          variant={s === 'Open' ? 'success' : s === 'Closed' ? 'danger' : 'info'}
        >
          {s}
        </Badge>
      ))}
    </div>
  )
}

export default JobBadge
