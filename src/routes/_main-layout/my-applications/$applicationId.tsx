import { createFileRoute, useRouter } from '@tanstack/react-router'

import useApplication from '@/hooks/application/use-application'

import CandidateInfor, { CandidateInforSkeleton } from '@/components/application-detail/candidate-infor'
import StagesAndRequests, { StagesAndRequestsSkeleton } from '@/components/application-detail/stages-and-request'
import NoResult from '@/components/shared/no-result'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_main-layout/my-applications/$applicationId')({
  component: MyApplicationDetail
})

function MyApplicationDetail() {
  const router = useRouter()

  const { applicationId } = Route.useParams()
  const { data, isLoading } = useApplication(applicationId)

  if (isLoading) {
    return <LoadingPage />
  }

  if (!data) {
    return <NoResult title='Not found application' description='' />
  }

  return (
    <div className='mt-6 flex flex-col'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-2xl font-semibold'>Application Detail</div>
        <Button variant='secondary' onClick={() => router.history.back()}>
          <img className='size-5' src='/icons/actions/back.svg' />
          Back
        </Button>
      </div>

      <div className='grid grid-cols-12 gap-4'>
        <CandidateInfor isCandidateView application={data} />

        <StagesAndRequests isCandidateView application={data} />
      </div>
    </div>
  )
}

export default MyApplicationDetail

export function LoadingPage() {
  return (
    <div className='flex flex-col'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-2xl font-semibold'>Application Detail</div>
        <Skeleton className='h-10 w-20' />
      </div>

      <div className='grid grid-cols-12 gap-4'>
        <CandidateInforSkeleton />

        <StagesAndRequestsSkeleton isCandidateView />
      </div>
    </div>
  )
}
