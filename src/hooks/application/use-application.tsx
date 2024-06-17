import { useAuth } from '@clerk/clerk-react'
import { Application, Candidate, InterviewSession, Job, JobDetail, TestExam, TestSession, User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

export type ApplicationDetail = Application & {
  jobDetail: JobDetail & {
    job: Job
  }
  testSession: (TestSession & { testExam: TestExam & { countQuestions: number } }) | null
  interviewSession: InterviewSession | null
  candidate: Candidate & { user: User }
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
