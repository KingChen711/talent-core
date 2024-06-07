import { talentCoreApi } from '@/services/talent-core-api'
import { UserWithRole } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

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
