import { JobSearch } from '@/lib/validation/job.validation'
import { talentCoreApi } from '@/services/talent-core-api'
import { PagingMetaData } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { Job } from '@prisma/client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export type JobStatus = ('Open' | 'Closed' | 'Upcoming')[]

type Jobs = (Job & { status: JobStatus })[]

function useJobs(searchParams: JobSearch) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['jobs', searchParams],
    queryFn: async () =>
      talentCoreApi
        .get<Jobs>('/api/jobs', {
          params: searchParams,
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => ({
          metadata: JSON.parse(res.headers['x-pagination']) as PagingMetaData,
          items: res.data
        })),
    placeholderData: keepPreviousData
  })
}

export default useJobs
