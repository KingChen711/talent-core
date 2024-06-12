import { talentCoreApi } from '@/services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { Application, Candidate, Job, JobDetail, User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { TGetApplicationsSchema } from '@/lib/validation/application.validation'
import { PagingMetaData } from '@/types'

type Applications = (Application & {
  candidate: Candidate & {
    user: User
  }
  jobDetail: JobDetail & {
    job: Job
  }
})[]

function useRecruitmentDriveApplications(recruitmentDriveCode: string, searchParams: TGetApplicationsSchema) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['recruitment-drives', recruitmentDriveCode, 'applications', { searchParams }],
    queryFn: async () =>
      talentCoreApi
        .get<Applications>(`/api/recruitment-drives/${recruitmentDriveCode}/applications`, {
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

export default useRecruitmentDriveApplications
