import { cn, toDate } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { Paperclip } from 'lucide-react'

import { ApplicationDetail } from '@/hooks/application/use-application'

import DialogSendMail from '../email/dialog-send-mail'
import ApplicationBadge from '../shared/application-badge'
import { Skeleton } from '../ui/skeleton'

type Props = {
  application: ApplicationDetail
  isCandidateView?: boolean
}

function CandidateInfor({ application, isCandidateView = false }: Props) {
  return (
    <>
      <div className='col-span-3 flex flex-col items-center justify-center rounded-lg bg-card p-6'>
        <img alt='avatar' src={application.candidate.user.avatar} className='mb-6 size-24 rounded-full' />
        <div className='line-clamp-1 text-lg font-bold'>{application.fullName}</div>
        <div className='line-clamp-1 text-sm text-muted-foreground'>{application.email}</div>
        <Link target='_blank' to={application.cv} className='group mt-2 flex items-center text-sm font-bold'>
          <Paperclip className='size-4 group-hover:text-[#6e38e0]' />
          <div className='group-hover:text-gradient'>Attachment CV</div>
        </Link>
        {!isCandidateView && <DialogSendMail candidateEmail={application.email} />}
      </div>
      <div className='col-span-9 grid grid-cols-12 gap-2 rounded-lg bg-card p-6'>
        <div className='col-span-4 flex flex-col gap-y-1'>
          <div className='line-clamp-1 font-bold text-muted-foreground'>Gender</div>
          <div className='line-clamp-1'>{application.gender}</div>
        </div>
        <div className='col-span-4 flex flex-col gap-y-1'>
          <div className='line-clamp-1 font-bold text-muted-foreground'>Born Year</div>
          <div className='line-clamp-1'>{application.bornYear}</div>
        </div>
        <div className='col-span-4 flex flex-col gap-y-1'>
          <div className='line-clamp-1 font-bold text-muted-foreground'>Phone</div>
          <div className='line-clamp-1'>{application.phone}</div>
        </div>
        <div className='col-span-4 flex flex-col gap-y-1'>
          <div className='line-clamp-1 font-bold text-muted-foreground'>Applied Job</div>
          <div className='line-clamp-1'>{application.jobDetail.job.name}</div>
        </div>
        <div className='col-span-4 flex flex-col gap-y-1'>
          <div className='line-clamp-1 font-bold text-muted-foreground'>Applied Date</div>
          <div className='line-clamp-1'>{toDate(application.createdAt)}</div>
        </div>
        <div className='col-span-4 flex flex-col gap-y-1'>
          <div className='line-clamp-1 font-bold text-muted-foreground'>Status</div>
          <div className='line-clamp-1'>
            <ApplicationBadge status={application.status} />
          </div>
        </div>
        <div className='col-span-12 flex flex-col gap-y-1'>
          <div className='line-clamp-1 font-bold text-muted-foreground'>Personal Introductions</div>
          <div className='line-clamp-5 max-w-[90%]'>{application.personalIntroduction}</div>
        </div>
      </div>
    </>
  )
}

export default CandidateInfor

export function CandidateInforSkeleton({ isCandidateView }: { isCandidateView?: boolean }) {
  return (
    <>
      <div
        className={cn(
          'col-span-3 flex flex-col items-center justify-center rounded-lg bg-card p-6',
          isCandidateView ? 'h-[244px]' : 'h-[306px]'
        )}
      >
        <Skeleton className='mb-6 size-24 rounded-full' />
        <Skeleton className='h-7 w-36'></Skeleton>
        <Skeleton className='mt-2 h-5 w-36'></Skeleton>
        <Skeleton className='mt-2 h-5 w-36'></Skeleton>
        {!isCandidateView && <Skeleton className='mt-5 h-10 w-full'></Skeleton>}
      </div>
      <div className='col-span-9 grid grid-cols-12 gap-2 rounded-lg bg-card p-6'>
        <div className='col-span-4 flex flex-col gap-y-1'>
          <Skeleton className='mb-1 h-6 w-28'></Skeleton>
          <Skeleton className='h-6 w-28'></Skeleton>
        </div>
        <div className='col-span-4 flex flex-col gap-y-1'>
          <Skeleton className='mb-1 h-6 w-28'></Skeleton>
          <Skeleton className='h-6 w-28'></Skeleton>
        </div>
        <div className='col-span-4 flex flex-col gap-y-1'>
          <Skeleton className='mb-1 h-6 w-28'></Skeleton>
          <Skeleton className='h-6 w-28'></Skeleton>
        </div>
        <div className='col-span-4 flex flex-col gap-y-1'>
          <Skeleton className='mb-1 h-6 w-28'></Skeleton>
          <Skeleton className='h-6 w-28'></Skeleton>
        </div>
        <div className='col-span-4 flex flex-col gap-y-1'>
          <Skeleton className='mb-1 h-6 w-28'></Skeleton>
          <Skeleton className='h-6 w-28'></Skeleton>
        </div>
        <div className='col-span-4 flex flex-col gap-y-1'>
          <Skeleton className='mb-1 h-6 w-28'></Skeleton>
          <Skeleton className='h-6 w-28'></Skeleton>
        </div>
        <div className='col-span-12 flex flex-col gap-y-1'>
          <Skeleton className='mb-1 h-6 w-36'></Skeleton>
          <Skeleton className='mb-1 h-6 w-full'></Skeleton>
        </div>
      </div>
    </>
  )
}
