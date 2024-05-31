import { TGetRecruitmentDrivesSchema } from '@/lib/validation/recruitment-drive.validation'
import { talentCoreApi } from '@/services/talent-core-api'
import { PagingMetaData } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { RecruitmentDrive } from '@prisma/client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

function useRecruitmentDrives(searchParams: TGetRecruitmentDrivesSchema) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['recruitment-drives', searchParams],
    queryFn: async () =>
      talentCoreApi
        .get<RecruitmentDrive[]>('/api/recruitment-drives', {
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

export default useRecruitmentDrives
