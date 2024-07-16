import { Role } from '@/types'

import { Badge } from '../ui/badge'

type Props = {
  role: Role
}

function RoleBadge({ role }: Props) {
  return (
    <Badge
      className='flex w-[90px] justify-center text-sm font-extrabold'
      variant={role === 'Candidate' ? 'info' : 'warning'}
    >
      {role}
    </Badge>
  )
}

export default RoleBadge
