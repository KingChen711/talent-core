import { TApproveApplicationSchema } from '@/lib/validation/application.validation'
import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

type MutationType = {
  applicationId: string
  data: TApproveApplicationSchema
}

function useApproveApplication() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ applicationId, data }: MutationType) =>
      talentCoreApi.patch(`/api/applications/${applicationId}/approve`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
  })
}

export default useApproveApplication
