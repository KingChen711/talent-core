import { useMutation } from '@tanstack/react-query'
import { talentCoreApi } from '../../services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'

type TTestExamAddJobs = {
  testExamCode: string
  jobIds: string[]
}

function useTestExamAddJobs() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ testExamCode, jobIds }: TTestExamAddJobs) =>
      talentCoreApi.post(
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

export default useTestExamAddJobs
