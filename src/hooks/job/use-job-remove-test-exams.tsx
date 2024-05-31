import { useMutation } from '@tanstack/react-query'
import { talentCoreApi } from '../../services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'

type TJobRemoveTestExams = {
  jobCode: string
  testExamIds: string[]
}

function useJobRemoveTestExam() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ jobCode, testExamIds }: TJobRemoveTestExams) =>
      talentCoreApi.patch(
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

export default useJobRemoveTestExam
