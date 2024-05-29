import { TestExamSearch } from '@/routes/_employee-layout/test-exams'
import { talentCoreApi } from '@/services/talent-core-api'
import { PagingMetaData } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { TestExam } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

type TestExams = TestExam[]

function useTestExams(searchParams: TestExamSearch) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['test-exams', searchParams],
    queryFn: async () =>
      talentCoreApi
        .get<TestExams>('/api/test-exams', {
          params: searchParams,
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => ({
          metadata: JSON.parse(res.headers['x-pagination']) as PagingMetaData,
          items: res.data
        }))
  })
}

export default useTestExams
