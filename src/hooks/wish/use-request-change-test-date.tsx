import { TRequestChangeTestDate } from '@/lib/validation/application.validation'
import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

type MutationType = {
  applicationId: string
  data: TRequestChangeTestDate
}

function useRequestChangeTestDate() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ applicationId, data }: MutationType) => {
      return talentCoreApi.post(`/api/applications/${applicationId}/request-change-test-date`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
    }
  })
}

export default useRequestChangeTestDate
