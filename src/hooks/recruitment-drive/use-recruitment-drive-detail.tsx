import { talentCoreApi } from '@/services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { Application, Candidate, Job, JobDetail, RecruitmentDrive } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export type JobDetails = (JobDetail & {
  job: Job
  countApplicationsLastWeek: number
  countApplicationsApproved: number
  applications: (Application & {
    candidate: Candidate
  })[]
})[]

type RecruitmentDriveDetail = RecruitmentDrive & {
  jobDetails: JobDetails
}

function useRecruitmentDriveDetail(recruitmentDriveId: string) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['recruitment-drives', recruitmentDriveId],
    queryFn: async () =>
      talentCoreApi
        .get<RecruitmentDriveDetail>(`/api/recruitment-drives/${recruitmentDriveId}/detail`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => res.data)
  })
}

export default useRecruitmentDriveDetail
