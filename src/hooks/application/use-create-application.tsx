import { useMutation } from '@tanstack/react-query'
import { talentCoreApi } from '../../services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'

type MutateType = {
  recruitmentDriveCode: string
  jobCode: string
  formData: FormData
}

function useCreateApplication() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ jobCode, recruitmentDriveCode, formData }: MutateType) =>
      talentCoreApi.post(`/api/recruitment-drives/${recruitmentDriveCode}/jobs/${jobCode}/applications`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${await getToken()}`
        }
      })
  })
}

export default useCreateApplication
