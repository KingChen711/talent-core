import { TMutationTestExamSchema } from '@/lib/validation/test-exam.validation'
import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

import { talentCoreApi } from '../../services/talent-core-api'

function useMutateTestExam(type: 'create' | 'update') {
  const { getToken } = useAuth()

  if (type === 'create') {
    return useMutation({
      mutationFn: async (testExam: TMutationTestExamSchema) =>
        talentCoreApi.post('/api/test-exams', testExam, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getToken()}`
          }
        })
    })
  }

  return useMutation({
    mutationFn: async (testExam: TMutationTestExamSchema) => {
      //   const testExamId = testExam.get('id')
      return talentCoreApi.put(`/api/test-exams/${testExam.id}`, testExam, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`
        }
      })
    }
  })
}

export default useMutateTestExam
