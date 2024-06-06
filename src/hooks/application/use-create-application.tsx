import { useMutation } from '@tanstack/react-query'
import { talentCoreApi } from '../../services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { TCreateApplicationSchema } from '@/lib/validation/application.validation'

type MutateType = {
  recruitmentDriveCode: string
  jobCode: string
  data: TCreateApplicationSchema
}

function useCreateApplication() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ jobCode, recruitmentDriveCode, data }: MutateType) => {
      const body = {
        candidateEmail: data.candidateEmail,
        createCandidate: data.createCandidate,
        candidateData: data.createCandidate
          ? {
              ...data,
              candidateEmail: undefined,
              createCandidate: undefined
            }
          : undefined
      }

      talentCoreApi.post(`/api/recruitment-drives/${recruitmentDriveCode}/jobs/${jobCode}/applications`, body, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
    }
  })
}

export default useCreateApplication
