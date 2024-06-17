import { cn } from '@/lib/utils'
import { TestSessionStatus } from '@prisma/client'

import { Badge } from '../ui/badge'

type Props = {
  status: TestSessionStatus
}

function TestSessionBadge({ status }: Props) {
  return (
    <Badge
      variant={status === 'Processing' ? 'warning' : status === 'Pass' ? 'success' : 'danger'}
      className='flex w-20 items-center justify-center font-bold'
    >
      {status}
    </Badge>
  )
}

export default TestSessionBadge
