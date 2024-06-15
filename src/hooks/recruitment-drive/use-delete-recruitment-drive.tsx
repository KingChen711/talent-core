import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

function useDeleteRecruitmentDrive() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (recruitmentDriveId: string) => {
      return talentCoreApi.delete(`/api/recruitment-drives/${recruitmentDriveId}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
    }
  })
}

export default useDeleteRecruitmentDrive
