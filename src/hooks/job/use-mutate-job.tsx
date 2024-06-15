import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

function useMutateJob(type: 'create' | 'update') {
  const { getToken } = useAuth()

  if (type === 'create') {
    return useMutation({
      mutationFn: async (job: FormData) =>
        talentCoreApi.post('/api/jobs', job, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${await getToken()}`
          }
        })
    })
  }

  return useMutation({
    mutationFn: async (job: FormData) => {
      const jobId = job.get('id')
      return talentCoreApi.put(`/api/jobs/${jobId}`, job, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${await getToken()}`
        }
      })
    }
  })
}

export default useMutateJob
