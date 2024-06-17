import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

import { TScheduleTestExamSchema } from '../../lib/validation/application.validation'

type MutateType = {
  applicationId: string
  data: TScheduleTestExamSchema
}

function useEditTestSession() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ applicationId, data }: MutateType) =>
      talentCoreApi.patch(`/api/applications/${applicationId}/edit-test-session`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
  })
}

export default useEditTestSession
