import { z } from 'zod'

export const testExamSearchSchema = z.object({
  pageNumber: z.number().catch(1),
  pageSize: z.number().catch(5),
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

const questionOptionSchema = z.object({
  content: z.string().min(1),
  correct: z.boolean()
})

const questionSchema = z
  .object({
    id: z.string().optional(), // uuid hoặc mongoId
    content: z.string().min(1),
    options: z.array(questionOptionSchema).length(4)
  })
  .refine(
    (data) => {
      const count = data.options.reduce((acc, num) => (num.correct ? acc + 1 : acc), 0)
      return count === 1
    },
    {
      message: 'Question need one and only one correct option'
    }
  )

export type TQuestionSchema = z.infer<typeof questionSchema>

export const mutationTestExamSchema = z.object({
  id: z.string().optional(),
  code: z
    .string()
    .min(2)
    .max(50)
    .refine((value) => !/\s/.test(value), {
      message: 'Code must not contain any whitespace'
    }),
  name: z.string().min(2).max(50),
  conditionPoint: z.coerce
    .number()
    .gt(0)
    .max(10)
    .transform((data) => Number(data.toFixed(2))),
  duration: z.coerce.number().int().gt(0),
  description: z.string().optional(),
  questions: z.array(questionSchema).min(2)
})

export type TMutationTestExamSchema = z.infer<typeof mutationTestExamSchema>

export type TMutateTestExamErrors = {
  [key in keyof TMutationTestExamSchema]: string
}

const questionIndexSchema = z.string().refine((val) => /^[0-9]+$/.test(val), {
  message: 'Key must be a string representing a non-negative integer'
})

const optionIndexSchema = z.enum(['A', 'B', 'C', 'D'])

export const answersSchema = z.record(questionIndexSchema, optionIndexSchema)
export type TAnswersSchema = z.infer<typeof answersSchema>
