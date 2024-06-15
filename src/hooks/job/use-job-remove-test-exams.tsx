import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

type TJobRemoveTestExams = {
  jobCode: string
  testExamIds: string[]
}

function useJobRemoveTestExams() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ jobCode, testExamIds }: TJobRemoveTestExams) =>
      talentCoreApi.patch(
        `/api/jobs/${jobCode}/test-exams`,
        { testExamIds },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getToken()}`
          }
        }
      )
  })
}

export default useJobRemoveTestExams
