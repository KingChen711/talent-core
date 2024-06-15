import { TOpenJobSchema } from '@/lib/validation/job.validation'
import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

type TRecruitmentDriveAddJob = {
  recruitmentDriveCode: string
  data: TOpenJobSchema
}

function useRecruitmentDriveAddJob() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ recruitmentDriveCode, data }: TRecruitmentDriveAddJob) =>
      talentCoreApi.post(`/api/recruitment-drives/${recruitmentDriveCode}/jobs`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
  })
}

export default useRecruitmentDriveAddJob
