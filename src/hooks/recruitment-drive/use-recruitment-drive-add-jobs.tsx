import { useMutation } from '@tanstack/react-query'
import { talentCoreApi } from '../../services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'

type TRecruitmentDriveAddJobs = {
  recruitmentDriveCode: string
  jobIds: string[]
}

function useRecruitmentDriveAddJobs() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ recruitmentDriveCode, jobIds }: TRecruitmentDriveAddJobs) =>
      talentCoreApi.post(
        `/api/recruitment-drives/${recruitmentDriveCode}/jobs`,
        { jobIds },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getToken()}`
          }
        }
      )
  })
}

export default useRecruitmentDriveAddJobs
