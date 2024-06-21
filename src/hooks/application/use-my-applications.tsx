import { TGetMyApplicationsSchema } from '@/lib/validation/application.validation'
import { PagingMetaData } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { Application, Job, JobDetail, RecruitmentDrive } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

type MyApplications = (Application & {
  jobDetail: JobDetail & {
    job: Job
    recruitmentDrive: RecruitmentDrive
  }
})[]

function useMyApplications(searchParams: TGetMyApplicationsSchema) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['applications', 'my-applications', { searchParams }],
    queryFn: async () =>
      talentCoreApi
        .get<MyApplications>(`/api/applications/my-applications`, {
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

export default useMyApplications
