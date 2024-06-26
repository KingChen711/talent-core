import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

type TJobRemoveTestExams = {
  testExamCode: string
  jobIds: string[]
}

function useTestExamRemoveJobs() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ testExamCode, jobIds }: TJobRemoveTestExams) =>
      talentCoreApi.patch(
        `/api/test-exams/${testExamCode}/jobs`,
        { jobIds },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getToken()}`
          }
        }
      )
  })
}

export default useTestExamRemoveJobs
