import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

import { TScheduleInterviewSchema } from '../../lib/validation/application.validation'

type MutateType = {
  applicationId: string
  data: TScheduleInterviewSchema
}

function useEditInterviewSession() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ applicationId, data }: MutateType) =>
      talentCoreApi.patch(`/api/applications/${applicationId}/edit-interview-session`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
  })
}

export default useEditInterviewSession
