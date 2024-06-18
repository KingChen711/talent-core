import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

import { TSendMailSchema } from '../../lib/validation/email.validation'

function useSendMail() {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (data: TSendMailSchema) => {
      return talentCoreApi.post(`/api/email/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
    }
  })
}

export default useSendMail
