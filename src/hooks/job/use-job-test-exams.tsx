import { talentCoreApi } from '@/services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { TestExam } from '@prisma/client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

function useJobTestExams(jobCode: string) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['jobs', jobCode, 'test-exams'],
    queryFn: async () =>
      talentCoreApi
        .get<TestExam[]>(`/api/jobs/${jobCode}/test-exams`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData
  })
}

export default useJobTestExams
