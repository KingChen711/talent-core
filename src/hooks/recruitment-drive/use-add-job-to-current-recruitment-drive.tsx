import { TOpenJobSchema } from '@/lib/validation/job.validation'
import { talentCoreApi } from '@/services/talent-core-api'
import { useAuth } from '@clerk/clerk-react'
import { JobDetail } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'

function useAddJobToCurrentRecruitmentDrive() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (body: TOpenJobSchema) => {
      const token = await getToken()

      console.log({ token })

      return talentCoreApi
        .post<JobDetail>('/api/recruitment-drives/add-job-to-current-drive', body, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => res.data)
    }
  })
}

export default useAddJobToCurrentRecruitmentDrive
