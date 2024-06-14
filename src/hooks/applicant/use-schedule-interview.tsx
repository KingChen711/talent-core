import { useMutation } from '@tanstack/react-query'
import { talentCoreApi } from '../../services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { TScheduleInterviewSchema } from '../../lib/validation/applicant.validation'

type MutateType = {
  applicantId: string
  data: TScheduleInterviewSchema
}

function useScheduleInterview() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ applicantId, data }: MutateType) =>
      talentCoreApi.patch(`/api/applicants/${applicantId}/schedule-interview`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
  })
}

export default useScheduleInterview
