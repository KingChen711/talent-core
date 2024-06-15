import { JobSearch } from '@/lib/validation/job.validation'
import { PagingMetaData } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { Job } from '@prisma/client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

type Jobs = (Job & { isOpening: boolean })[]

function useRecruitmentDriveAddableJobs(
  recruitmentDriveCode: string,
  searchParams: JobSearch,
  onError: (error: unknown) => void
) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['recruitment-drives', recruitmentDriveCode, 'addable-jobs', { searchParams }],
    queryFn: async () =>
      talentCoreApi
        .get<Jobs>(`/api/recruitment-drives/${recruitmentDriveCode}/addable-jobs`, {
          params: searchParams,
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => ({
          metadata: JSON.parse(res.headers['x-pagination']) as PagingMetaData,
          items: res.data
        }))
        .catch((error) => {
          onError(error)
          return {
            metadata: {
              hasNext: false,
              hasPrevious: false,
              pageNumber: searchParams.pageSize,
              pageSize: searchParams.pageSize,
              totalCount: 0,
              totalPages: 0
            } as PagingMetaData,
            items: []
          }
        }),
    placeholderData: keepPreviousData
  })
}

export default useRecruitmentDriveAddableJobs
