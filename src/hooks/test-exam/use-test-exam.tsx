import { useAuth } from '@clerk/clerk-react'
import { Question, TestExam } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

type TestExamDetail = TestExam & { questions: Question[] }

function useTestExam(testExamId: string | undefined, callback: (data: TestExamDetail) => void) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['test-exams', testExamId],
    enabled: testExamId !== undefined,
    refetchOnWindowFocus: false,
    queryFn: async () =>
      talentCoreApi
        .get<TestExamDetail>(`/api/test-exams/${testExamId}`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => res.data)
        .then(callback)
  })
}

export default useTestExam
