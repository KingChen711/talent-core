import { useMutation } from '@tanstack/react-query'
import { talentCoreApi } from '../../services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { TMutationRecruitmentDriveSchema } from '@/lib/validation/recruitment-drive.validation'

function useMutateRecruitmentDrive(type: 'create' | 'update') {
  const { getToken } = useAuth()

  if (type === 'create') {
    return useMutation({
      mutationFn: async (recruitmentDrive: TMutationRecruitmentDriveSchema) =>
        talentCoreApi.post('/api/recruitment-drives', recruitmentDrive, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getToken()}`
          }
        })
    })
  }

  return useMutation({
    mutationFn: async (recruitmentDrive: TMutationRecruitmentDriveSchema) => {
      const recruitmentDriveId = recruitmentDrive.id
      return talentCoreApi.put(`/api/recruitment-drives/${recruitmentDriveId}`, recruitmentDrive, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
    }
  })
}

export default useMutateRecruitmentDrive
