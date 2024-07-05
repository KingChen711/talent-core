import { createFileRoute } from '@tanstack/react-router'

import useOpeningJobs from '@/hooks/job/use-opening-jobs'

import OpeningJobCard, { OpeningJobCardSkeleton } from '@/components/jobs/opening-job-card'

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

  if (!data || data.length === 0) {
    return (
      <div className='absolute inset-0 flex w-full flex-col items-center justify-center'>
        <img src='/images/no-jobs.png' alt='no result' className='size-[270px] object-contain' />
        <h2 className='mt-8 text-[24px] font-bold leading-[31.2px]'>No Opening Jobs Found</h2>
        <p className='my-3.5 max-w-md text-center'>
          Sorry. Unless you&apos;ve got a magic wand, there are no current openings. Let&apos;s stay connected and
          we&apos;ll notify you as soon as opportunities arise.
        </p>
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
