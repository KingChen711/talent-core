import { useMutation } from '@tanstack/react-query'
import { talentCoreApi } from '../../services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'

function useCompleteInterview() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (applicantId: string) =>
      talentCoreApi.patch(
        `/api/applicants/${applicantId}/complete-interview`,
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

export default useCompleteInterview
