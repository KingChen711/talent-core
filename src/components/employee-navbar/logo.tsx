import { cn } from '@/lib/utils'

type Props = {
  mobile?: boolean
}

function Logo({ mobile = false }: Props) {
  return (
    <div className='flex items-center gap-x-1 lg:px-5'>
      <img src='/icons/logo.svg' className='size-8 object-cover' />
      <div className={cn('text-2xl font-bold max-sm:hidden', mobile && 'max-sm:block')}>TalentCore</div>
    </div>
  )
}

export default Logo
