import { talentCoreApi } from '@/services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { Applicant, Job, JobDetail } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { TGetApplicantsSchema } from '@/lib/validation/applicant.validation'
import { PagingMetaData } from '@/types'

type Applicants = (Applicant & {
  jobDetail: JobDetail & {
    job: Job
  }
})[]

function useRecruitmentDriveApplicants(recruitmentDriveCode: string, searchParams: TGetApplicantsSchema) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['recruitment-drives', recruitmentDriveCode, 'applicants', { searchParams }],
    queryFn: async () =>
      talentCoreApi
        .get<Applicants>(`/api/recruitment-drives/${recruitmentDriveCode}/applicants`, {
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

export default useRecruitmentDriveApplicants
