import { useAuth } from '@clerk/clerk-react'
import { Application, InterviewSession, Job, JobDetail, TestSession } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

type ApplicationDetail = Application & {
  jobDetail: JobDetail & {
    job: Job
  }
  testSession: TestSession | null
  interviewSession: InterviewSession | null
}

function useApplication(applicationId: string) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['applications', applicationId],
    queryFn: async () =>
      talentCoreApi
        .get<ApplicationDetail>(`/api/applications/${applicationId}`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => res.data)
  })
}

export default useApplication
