import { createFileRoute } from '@tanstack/react-router'

import useOpeningJobs from '@/hooks/job/use-opening-jobs'

import OpeningJobCard, { OpeningJobCardSkeleton } from '@/components/jobs/opening-job-card'
import NoResult from '@/components/shared/no-result'

export const Route = createFileRoute('/_main-layout/opening-jobs/')({
  component: OpeningJobs
})

function OpeningJobs() {
  const { data, isLoading } = useOpeningJobs()

  if (isLoading)
    return (
      <div>
        <div className='mb-2 mt-8 text-2xl font-semibold'>Opening Jobs</div>

        <div className='my-5 flex flex-wrap justify-center gap-4'>
          <OpeningJobCardSkeleton />
          <OpeningJobCardSkeleton />
          <OpeningJobCardSkeleton />
          <OpeningJobCardSkeleton />
          <OpeningJobCardSkeleton />
          <OpeningJobCardSkeleton />
        </div>
      </div>
    )

  if (!data) {
    return (
      <div>
        <NoResult title='No opening jobs found' />
        <p className='mt-2 text-center text-lg'>Coming soon.... Let&apos;s wait for the next our recruitment drive.</p>
      </div>
    )
  }

  return (
    <div>
      <div className='mb-2 mt-8 text-2xl font-semibold'>Opening Jobs</div>

      <div className='my-5 flex flex-wrap justify-center gap-4'>
        {data?.map((job) => {
          return <OpeningJobCard key={job.id} openingJob={job} />
        })}
      </div>
    </div>
  )
}

export default OpeningJobs
