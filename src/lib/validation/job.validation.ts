import { testExamsPageSize } from '@/constants'
import { z } from 'zod'

export const testExamSearchSchema = z.object({
  pageNumber: z.number().catch(1),
  pageSize: z.number().catch(testExamsPageSize),
  search: z.string().catch(''),
  sort: z
    .enum([
      'code',
      'name',
      '-code',
      '-name',
      'createdAt',
      '-createdAt',
      'conditionPoint',
      '-conditionPoint',
      'duration',
      '-duration'
    ])
    .catch('-createdAt')
})

export type TestExamSearch = z.infer<typeof testExamSearchSchema>

export const mutationJobSchema = z
  .object({
    code: z.string().min(2).max(50),
    name: z.string().min(2).max(50),
    description: z.string().optional(),
    color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^$/, 'Invalid color'),
    icon: z.string().optional(),
    openInCurrentRecruitment: z.boolean(),
    quantityInCurrentRecruitment: z.coerce.number().int().optional()
  })
  .refine(
    (data) => {
      return (
        !data.openInCurrentRecruitment ||
        (data.quantityInCurrentRecruitment &&
          Number.isInteger(data.quantityInCurrentRecruitment) &&
          data.quantityInCurrentRecruitment > 0)
      )
    },
    {
      path: ['quantityInCurrentRecruitment'],
      message: 'Number of candidates needed must be a number a greater than 0'
    }
  )

export type TMutationJobSchema = z.infer<typeof mutationJobSchema>

export type TMutateJobErrors = {
  [key in keyof TMutationJobSchema]: string
}

export const openJobSchema = z.object({
  quantityInCurrentRecruitment: z.coerce.number().int().min(1)
})

export type TOpenJobSchema = z.infer<typeof openJobSchema>
