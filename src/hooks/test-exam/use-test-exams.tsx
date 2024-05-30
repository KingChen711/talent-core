import { TestExamSearch } from '@/lib/validation/job.validation'
import { talentCoreApi } from '@/services/talent-core-api'
import { PagingMetaData } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { TestExam } from '@prisma/client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

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
        })),
    placeholderData: keepPreviousData
  })
}

export default useTestExams
