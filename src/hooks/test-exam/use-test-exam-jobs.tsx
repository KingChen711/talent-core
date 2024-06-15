import { useAuth } from '@clerk/clerk-react'
import { Job } from '@prisma/client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

type Jobs = (Job & { isOpening: boolean })[]

function useTestExamJobs(testExamCode: string) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['test-exams', testExamCode, 'jobs'],
    queryFn: async () =>
      talentCoreApi
        .get<Jobs>(`/api/test-exams/${testExamCode}/jobs`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData
  })
}

export default useTestExamJobs
