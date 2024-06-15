import { UserWithRole } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

function useSearchCandidateProfile() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (candidateEmail: string) =>
      talentCoreApi.get<UserWithRole>(`/api/users/candidate-profile/${candidateEmail}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
  })
}

export default useSearchCandidateProfile
