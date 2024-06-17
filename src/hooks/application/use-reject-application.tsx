import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

function useRejectApplication() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (applicationId: string) =>
      talentCoreApi.patch(
        `/api/applications/${applicationId}/reject`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getToken()}`
          }
        }
      )
  })
}

export default useRejectApplication
