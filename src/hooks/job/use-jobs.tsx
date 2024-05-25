import { JobSearch } from '@/routes/_employee-layout/jobs'
import { talentCoreApi } from '@/services/talent-core-api'
import { PagingMetaData } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { Job } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

type Jobs = (Job & { isOpening: true })[]

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
        }))
  })
}

export default useJobs
