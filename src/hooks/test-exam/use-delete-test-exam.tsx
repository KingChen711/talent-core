import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

function useDeleteTestExam() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (testExamId: string) => {
      return talentCoreApi.delete(`/api/test-exams/${testExamId}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
    }
  })
}

export default useDeleteTestExam
