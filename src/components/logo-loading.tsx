import { cn } from '@/lib/utils'

type Props = {
  loading?: boolean
  showText?: boolean
}

function LogoLoading({ loading = true, showText = true }: Props) {
  return (
    <div className='flex items-center gap-x-1 lg:px-5'>
      <img src='/icons/logo.svg' className={cn('size-12 object-cover', loading && 'animate-spin')} />
      {showText && <div className='text-3xl font-bold'>TalentCore</div>}
    </div>
  )
}

export default LogoLoading
