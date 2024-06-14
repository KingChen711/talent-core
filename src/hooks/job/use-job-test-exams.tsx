import { talentCoreApi } from '@/services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { TestExam } from '@prisma/client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

type TestExams = (TestExam & {
  countQuestions: number
})[]

function useJobTestExams(jobCode: string) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['jobs', jobCode, 'test-exams'],
    queryFn: async () =>
      talentCoreApi
        .get<TestExams>(`/api/jobs/${jobCode}/test-exams`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData
  })
}

export default useJobTestExams
