import { z } from 'zod'

export const jobSearchSchema = z.object({
  pageNumber: z.number().catch(1),
  pageSize: z.number().catch(5),
  search: z.string().catch(''),
  status: z.enum(['All', 'Open', 'Closed', 'Upcoming']).catch('All'),
  sort: z.enum(['code', 'name', '-code', '-name', 'createdAt', '-createdAt']).catch('-createdAt')
})

export type JobSearch = z.infer<typeof jobSearchSchema>

export const mutationJobSchema = z.object({
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
  icon: z.string().optional()
})

export type TMutationJobSchema = z.infer<typeof mutationJobSchema>

export type TMutateJobErrors = {
  [key in keyof TMutationJobSchema]: string
}

export const openJobSchema = z.object({
  jobCode: z.string(),
  quantity: z.coerce.number().int().min(1)
})

export type TOpenJobSchema = z.infer<typeof openJobSchema>

export type TOpenJobErrors = {
  [key in keyof TOpenJobSchema]: string
}
