import { TRequestChangeReceiveJobDate } from '@/lib/validation/wish.validation'
import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

type MutationType = {
  applicationId: string
  data: TRequestChangeReceiveJobDate
}

function useRequestChangeReceiveJobDate() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ applicationId, data }: MutationType) => {
      return talentCoreApi.post(`/api/applications/${applicationId}/request-change-receive-job-date`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
    }
  })
}

export default useRequestChangeReceiveJobDate
