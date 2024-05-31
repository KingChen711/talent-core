import { JobSearch } from '@/lib/validation/job.validation'
import { talentCoreApi } from '@/services/talent-core-api'
import { PagingMetaData } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { Job } from '@prisma/client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

type Jobs = (Job & { isOpening: boolean })[]

function useTestExamAddableJobs(testExamCode: string, searchParams: JobSearch) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['test-exams', testExamCode, 'addable-jobs', { searchParams }],
    queryFn: async () =>
      talentCoreApi
        .get<Jobs>(`/api/test-exams/${testExamCode}/addable-jobs`, {
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

export default useTestExamAddableJobs
