import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

function useSaveApplicant() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (applicantId: string) =>
      talentCoreApi.patch(
        `/api/applicants/${applicantId}/save`,
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

export default useSaveApplicant
