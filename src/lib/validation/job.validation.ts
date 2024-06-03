import { jobsPageSize } from '@/constants'
import { z } from 'zod'

export const jobSearchSchema = z.object({
  pageNumber: z.number().catch(1),
  pageSize: z.number().catch(jobsPageSize),
  search: z.string().catch(''),
  status: z.enum(['all', 'opening', 'closed']).catch('all'),
  sort: z.enum(['code', 'name', '-code', '-name', 'createdAt', '-createdAt']).catch('-createdAt')
})

export type JobSearch = z.infer<typeof jobSearchSchema>

export const mutationJobSchema = z
  .object({
    code: z
      .string()
      .min(2)
      .max(50)
      .refine((value) => !/\s/.test(value), {
        message: 'Code must not contain any whitespace'
      }),
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
