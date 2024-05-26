import { useMutation } from '@tanstack/react-query'
import { talentCoreApi } from '../../services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'

function useDeleteJob() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (jobId: string) => {
      return talentCoreApi.delete(`/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
    }
  })
}

export default useDeleteJob
