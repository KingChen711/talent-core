import { useAuth } from '@clerk/clerk-react'
import { Question, TestExam, TestSession } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

type TestSessionDetail = TestSession & {
  testExam: TestExam & {
    questions: Question[]
  }
}

function useTakeTheTest(applicationId: string, onError: (error: unknown) => void) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['applications', applicationId, 'take-the-test'],
    refetchOnWindowFocus: false,
    queryFn: async () =>
      talentCoreApi
        .get<TestSessionDetail>(`/api/applications/${applicationId}/take-the-test`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => res.data)
        .catch(onError)
  })
}

export default useTakeTheTest
