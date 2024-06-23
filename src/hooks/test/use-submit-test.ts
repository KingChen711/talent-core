import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

import { TAnswersSchema } from '../../lib/validation/test-exam.validation'

export type SubmitTestType = {
  applicationId: string
  data: { answers: TAnswersSchema }
}

function useSubmitTest() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ applicationId, data }: SubmitTestType) =>
      talentCoreApi.post(`/api/applications/${applicationId}/submit-test`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
  })
}

export default useSubmitTest
