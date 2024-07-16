import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

function useToBeEmployee() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (userId: string) =>
      talentCoreApi.patch(
        `/api/users/${userId}/to-be-employee`,
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

export default useToBeEmployee
