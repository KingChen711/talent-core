import { toDaysAgo } from '@/lib/utils'

import { OpeningJob } from '@/hooks/job/use-opening-jobs'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

type Props = {
  openingJob: OpeningJob
}

function OpeningJobCard({ openingJob }: Props) {
  return (
    <div className='relative flex min-w-[470px] max-w-[800px] flex-1 gap-x-4 overflow-hidden rounded-3xl bg-card p-5 shadow md:gap-x-8'>
      <div
        style={{
          borderColor: openingJob.job.color
        }}
        className='flex size-[72px] items-center justify-center rounded-xl border-2 bg-border'
      >
        <img alt='job' src={openingJob.job.icon} className='size-14 object-cover' />
      </div>
      <div className='flex flex-1 flex-col'>
        <div className='flex w-full items-center justify-between'>
          <div className='line-clamp-1 text-xl font-bold'>{openingJob.job.name}</div>
          <Button variant='ghost' className='text-gradient text-base'>
            Apply Job
          </Button>
        </div>
        <div className='line-clamp-3'>{openingJob.job.description}</div>
        <div className='mt-3 flex items-center justify-between border-t border-muted pt-3 max-md:flex-col max-md:items-start'>
          <div className='z-10 flex gap-x-2'>
            <Badge className='pointer-events-none w-fit bg-[#d1d1d1] py-1 text-sm font-normal text-card-foreground dark:bg-[#282828] dark:text-white'>
              {openingJob.jobCode}
            </Badge>
            <Badge className='pointer-events-none w-fit bg-[#d1d1d1] py-1 text-sm font-normal text-card-foreground dark:bg-[#282828] dark:text-white'>
              {openingJob.quantity} needed
            </Badge>
          </div>

          <div className='text-sm text-muted-foreground max-md:ml-1 max-md:mt-1'>{toDaysAgo(openingJob.createdAt)}</div>
        </div>
      </div>
    </div>
  )
}

export default OpeningJobCard

export function OpeningJobCardSkeleton() {
  return <Skeleton className='h-[200px] min-w-[470px] max-w-[800px] flex-1 rounded-xl bg-card' />
}
