import { TGetApplicationsSchema } from '@/lib/validation/application.validation'
import { PagingMetaData } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { Application, Job, JobDetail } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

type Applications = (Application & {
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
