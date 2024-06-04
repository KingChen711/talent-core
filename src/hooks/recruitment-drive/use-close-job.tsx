import { talentCoreApi } from '@/services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

function useCloseJob() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (jobId: string) => {
      const token = await getToken()

      console.log({ token })

      return talentCoreApi
        .delete(`/api/recruitment-drives/close-job/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => res.data)
    }
  })
}

export default useCloseJob
