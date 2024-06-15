import { RecruitmentDriveStatus } from '@prisma/client'
import { Badge } from '../ui/badge'

type Props = {
  status: RecruitmentDriveStatus
}

function RecruitmentDriveBadge({ status }: Props) {
  return (
    <Badge
      className='flex w-[90px] justify-center text-sm font-extrabold'
      variant={status === 'Open' ? 'success' : status === 'Closed' ? 'danger' : 'info'}
    >
      {status}
    </Badge>
  )
}

export default RecruitmentDriveBadge
