import { WishStatus } from '@prisma/client'

import { Badge } from '../ui/badge'

type Props = {
  status: WishStatus
}

function WishBadge({ status }: Props) {
  let variant: 'default' | 'success' | 'warning' | 'info' | 'danger' | 'outline' | 'secondary'
  switch (status) {
    case 'Reject':
      variant = 'danger'
      break
    case 'Approve':
      variant = 'success'
      break
    case 'Processing':
      variant = 'warning'
      break
  }

  return (
    <>
      <Badge className='flex w-fit items-center justify-center text-xs' variant={variant}>
        {status}
      </Badge>
    </>
  )
}

export default WishBadge
