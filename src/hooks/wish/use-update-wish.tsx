import { TUpdateWishSchema } from '@/lib/validation/wish.validation'
import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

type MutationType = {
  applicationId: string
  data: TUpdateWishSchema
}

function useUpdateWish() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ applicationId, data }: MutationType) => {
      return talentCoreApi.patch(`/api/applications/${applicationId}/update-wish`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
    }
  })
}

export default useUpdateWish
