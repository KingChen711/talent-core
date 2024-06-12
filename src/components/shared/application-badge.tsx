import { ApplicationStatus } from '@prisma/client'
import { Badge } from '../ui/badge'

type Props = {
  status: ApplicationStatus
}

function ApplicationBadge({ status }: Props) {
  let variant: 'default' | 'success' | 'warning' | 'info' | 'danger' | 'outline' | 'secondary'
  switch (status) {
    case 'Screening':
      variant = 'default'
      break
    case 'Testing':
      variant = 'info'
      break
    case 'Interviewing':
      variant = 'warning'
      break
    case 'Reject':
      variant = 'danger'
      break
    case 'Approve':
      variant = 'success'
      break
    case 'Saved':
      variant = 'secondary'
      break
  }

  return (
    <>
      <Badge className='text-sm font-extrabold' variant={variant}>
        {status}
      </Badge>
    </>
  )
}

export default ApplicationBadge
