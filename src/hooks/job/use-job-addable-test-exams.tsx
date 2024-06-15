import { TestExamSearch } from '@/lib/validation/test-exam.validation'
import { PagingMetaData } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { TestExam } from '@prisma/client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

function useJobAddableTestExams(jobCode: string, searchParams: TestExamSearch) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['jobs', jobCode, 'addable-test-exams', { searchParams }],
    queryFn: async () =>
      talentCoreApi
        .get<TestExam[]>(`/api/jobs/${jobCode}/addable-test-exams`, {
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

export default useJobAddableTestExams
