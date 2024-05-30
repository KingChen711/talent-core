import { talentCoreApi } from '@/services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { Job } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

type JobDetail = Job & { isOpening: boolean }

function useJob(jobId: string | undefined, callback: (data: JobDetail) => void) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['jobs', jobId],
    enabled: jobId !== undefined,
    refetchOnWindowFocus: false,
    queryFn: async () =>
      talentCoreApi
        .get<JobDetail>(`/api/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => res.data)
        .then(callback)
  })
}

export default useJob
