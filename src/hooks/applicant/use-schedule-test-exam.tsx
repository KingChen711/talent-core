import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

import { TScheduleTestExamSchema } from '../../lib/validation/applicant.validation'

type MutateType = {
  applicantId: string
  data: TScheduleTestExamSchema
}

function useScheduleTestExam() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ applicantId, data }: MutateType) =>
      talentCoreApi.patch(`/api/applicants/${applicantId}/schedule-test-exam`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
  })
}

export default useScheduleTestExam
