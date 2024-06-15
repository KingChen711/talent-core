import { TApproveApplicantSchema } from '@/lib/validation/applicant.validation'
import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

type MutationType = {
  applicantId: string
  data: TApproveApplicantSchema
}

function useApproveApplicant() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ applicantId, data }: MutationType) =>
      talentCoreApi.patch(`/api/applicants/${applicantId}/approve`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
  })
}

export default useApproveApplicant
