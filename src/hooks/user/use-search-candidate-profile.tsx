import { talentCoreApi } from '@/services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { Role, User } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'

function useSearchCandidateProfile() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (candidateEmail: string) =>
      talentCoreApi.get<User & { role: Role }>(`/api/users/candidate-profile/${candidateEmail}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
  })
}

export default useSearchCandidateProfile
