import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

type Props = {
  mobile?: boolean
}

function Logo({ mobile = false }: Props) {
  return (
    <Link to='/dashboard' className='flex items-center gap-x-1 lg:px-5'>
      <img src='/icons/logo.svg' className='size-8 object-cover' />
      <div className={cn('text-2xl font-bold max-sm:hidden', mobile && 'max-sm:block')}>TalentCore</div>
    </Link>
  )
}

export default Logo
