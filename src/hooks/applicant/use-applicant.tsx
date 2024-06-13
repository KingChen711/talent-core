import { talentCoreApi } from '@/services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { Applicant, Job, JobDetail } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

type ApplicantDetail = Applicant & {
  jobDetail: JobDetail & {
    job: Job
  }
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
