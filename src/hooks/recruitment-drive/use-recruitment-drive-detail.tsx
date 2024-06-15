import { useAuth } from '@clerk/clerk-react'
import { Job, JobDetail, RecruitmentDrive } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

export type JobDetails = (JobDetail & {
  job: Job
  countApplicantsLastWeek: number
  countApplicantsApproved: number
  countApplicants: number
})[]

type RecruitmentDriveDetail = RecruitmentDrive & {
  jobDetails: JobDetails
}

function useRecruitmentDriveDetail(recruitmentDriveCode: string) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['recruitment-drives', recruitmentDriveCode],
    queryFn: async () =>
      talentCoreApi
        .get<RecruitmentDriveDetail>(`/api/recruitment-drives/${recruitmentDriveCode}/detail`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => res.data)
  })
}

export default useRecruitmentDriveDetail
