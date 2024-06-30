import { Job, JobDetail } from '@prisma/client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

export type OpeningJob = JobDetail & { job: Job }

function useOpeningJobs() {
  return useQuery({
    queryKey: ['jobs', 'opening-jobs'],
    queryFn: async () => talentCoreApi.get<OpeningJob[]>('/api/jobs/opening-jobs').then((res) => res.data),
    placeholderData: keepPreviousData
  })
}

export default useOpeningJobs
