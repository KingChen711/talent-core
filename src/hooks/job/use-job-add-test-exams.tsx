import { useMutation } from '@tanstack/react-query'
import { talentCoreApi } from '../../services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'

type TJobAddTestExams = {
  jobCode: string
  testExamIds: string[]
}

function useJobAddTestExam() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ jobCode, testExamIds }: TJobAddTestExams) =>
      talentCoreApi.post(
        `/api/jobs/${jobCode}/test-exams`,
        { testExamIds },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        }
      )
  })
}

export default useJobAddTestExam