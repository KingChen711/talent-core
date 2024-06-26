import { toDaysAgo } from '@/lib/utils'

import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'

type Props = {
  color: string
  icon: string
  countApplications: number
  countApplicationsApproved: number
  countApplicationsLastWeek: number
  quantity: number
  name: string
  createdAt: Date
  showNavigate?: boolean
}

function JobDetailCard({
  color,
  icon,
  name,
  createdAt,
  quantity,
  countApplications,
  countApplicationsLastWeek,
  countApplicationsApproved,
  showNavigate = true
}: Props) {
  return (
    <div
      style={{
        borderColor: color
      }}
      className='relative flex w-72 shrink-0 flex-col gap-y-3 overflow-hidden rounded-2xl border-l-[5px] bg-card px-[10px] py-4'
    >
      {showNavigate && (
        <div className='absolute right-2 top-2 z-10 flex size-11 items-center justify-center rounded-full bg-white/10'>
          <img className='size-5' src='/icons/actions/navigate.svg' />
        </div>
      )}

      <div
        style={{
          backgroundColor: color,
          boxShadow: `0 0 90px 90px ${color}40`
        }}
        className='absolute right-0 top-0 z-0 size-0'
      ></div>

      <div className='z-10 flex w-[215px] items-center gap-x-3'>
        <img className='size-12 object-cover' src={icon} />
        <div className='flex flex-col gap-y-1'>
          <h4 className='line-clamp-1 text-lg font-bold'>{name}</h4>
          <p className='text-xs text-muted-foreground'>{toDaysAgo(createdAt)}</p>
        </div>
      </div>

      <div className='z-10 flex gap-x-2'>
        <Badge className='pointer-events-none w-fit bg-[#d1d1d1] py-1 text-sm font-normal text-card-foreground dark:bg-[#282828] dark:text-white'>
          {countApplicationsApproved} approved
        </Badge>
        <Badge className='pointer-events-none w-fit bg-[#d1d1d1] py-1 text-sm font-normal text-card-foreground dark:bg-[#282828] dark:text-white'>
          {quantity} needed
        </Badge>
      </div>

      <div className='z-10 flex items-end justify-between'>
        <div className='ml-1 flex items-end gap-x-2'>
          <p className='text-[40px] font-bold leading-none'>{countApplications}</p>
          <p className='mb-[6px] text-sm text-muted-foreground'>applications</p>
        </div>

        <div className='mb-[6px] text-sm text-success'>{countApplicationsLastWeek} in last week</div>
      </div>
    </div>
  )
}

export default JobDetailCard

export function JobDetailCardSkeleton() {
  return <Skeleton className='h-[174px] w-72 shrink-0 rounded-2xl bg-card'></Skeleton>
}
