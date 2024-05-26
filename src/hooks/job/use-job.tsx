import { talentCoreApi } from '@/services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { Job, TestExam } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

type JobDetail = Job & { isOpening: boolean } & { testExams: TestExam[] }

function useJob(jobId: string) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['jobs', jobId],
    queryFn: async () =>
      talentCoreApi
        .get<JobDetail>(`/api/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => res.data)
  })
}

export default useJob
