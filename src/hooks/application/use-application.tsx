import { talentCoreApi } from '@/services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { Application, Candidate, Job, JobDetail, User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

type ApplicationDetail = Application & {
  jobDetail: JobDetail & {
    job: Job
  }
  candidate: Candidate & {
    user: User
  }
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
