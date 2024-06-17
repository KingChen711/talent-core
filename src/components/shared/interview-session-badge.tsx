import { InterviewStatus } from '@prisma/client'

import { Badge } from '../ui/badge'

type Props = {
  status: InterviewStatus
}

function InterviewSessionBadge({ status }: Props) {
  return (
    <Badge
      variant={status === 'Processing' ? 'warning' : 'success'}
      className='flex w-20 items-center justify-center font-bold'
    >
      {status}
    </Badge>
  )
}

export default InterviewSessionBadge
