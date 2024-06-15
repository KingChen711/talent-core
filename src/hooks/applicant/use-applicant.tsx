import { useAuth } from '@clerk/clerk-react'
import { Applicant, InterviewSession, Job, JobDetail, TestSession } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

type ApplicantDetail = Applicant & {
  jobDetail: JobDetail & {
    job: Job
  }
  testSession: TestSession | null
  interviewSession: InterviewSession | null
}

function useApplicant(applicantId: string) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['applicants', applicantId],
    queryFn: async () =>
      talentCoreApi
        .get<ApplicantDetail>(`/api/applicants/${applicantId}`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => res.data)
  })
}

export default useApplicant
