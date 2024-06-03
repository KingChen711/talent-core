import { talentCoreApi } from '@/services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { RecruitmentDrive } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

function useRecruitmentDrive(recruitmentDriveId: string | undefined, callback: (data: RecruitmentDrive) => void) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['recruitment-drives', recruitmentDriveId],
    enabled: recruitmentDriveId !== undefined,
    refetchOnWindowFocus: false,
    queryFn: async () =>
      talentCoreApi
        .get<RecruitmentDrive>(`/api/recruitment-drives/${recruitmentDriveId}`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => res.data)
        .then(callback)
  })
}

export default useRecruitmentDrive
