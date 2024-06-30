import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

function useCloseJob() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (jobCode: string) => {
      const token = await getToken()

      return talentCoreApi
        .delete(`/api/recruitment-drives/close-job/${jobCode}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => res.data)
    }
  })
}

export default useCloseJob
