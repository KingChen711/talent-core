import { getExampleQuestions, getOneExampleQuestion, isAxiosError } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import useMutateTestExam from '@/hooks/test-exam/use-mutate-test-exam'
import { toast } from '../ui/use-toast'
import { StatusCodes } from 'http-status-codes'
import { Loader2, Plus } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import {
  TMutateTestExamErrors,
  TMutationTestExamSchema,
  TQuestionSchema,
  mutationTestExamSchema
} from '@/lib/validation/test-exam.validation'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

type Props = {
  type: 'create' | 'update'
  testExamId?: string
} & (
  | {
      type: 'create'
    }
  | {
      type: 'update'
      testExamId: string
    }
)

function TestExamForm({ type, testExamId }: Props) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const form = useForm<TMutationTestExamSchema>({
    resolver: zodResolver(mutationTestExamSchema),
    defaultValues: {
      code: '',
      name: '',
      duration: 0,
      conditionPoint: 0,
      description: '',
      questions: getExampleQuestions()
    }
  })

  const questionsContentError = useMemo(() => {
    if (!form.formState.errors.questions) return []

    return form.formState.errors.questions
  }, [form.formState.errors])

  useEffect(() => {
    console.log({ errors: form.formState.errors })
  }, [form.formState.errors])

  useEffect(() => {
    console.log({ questionsContentError })
  }, [questionsContentError])

  const { mutate, isPending } = useMutateTestExam(type)

  // Get updated testExam
  //   const { isLoading } = useTestExam(testExamId, (testExam) => {
  //     form.setValue('code', testExam.code)
  //     form.setValue('name', testExam.name)
  //     form.setValue('description', testExam.description || '')
  //     form.setValue('color', testExam.color)
  //     form.setValue('icon', testExam.icon)
  //     form.setValue('openInCurrentRecruitment', testExam.isOpening)
  //     form.setValue(
  //       'testExamIds',
  //       testExam.testExams.map((test) => test.id)
  //     )
  //     setTestExams(testExam.testExams)
  //   })

  //   const disabling = useMemo(() => isPending || isLoading, [isPending, isLoading])
  const disabling = false

  const onSubmit = async (values: TMutationTestExamSchema) => {
    console.log(values)

    values.questions.map((q) => {
      q.id = undefined
      return q
    })

    if (type === 'create') {
      // do something
    } else {
      // do something
    }

    mutate(values, {
      onSuccess: () => {
        toast({
          title: `TestExam has been ${type === 'create' ? 'created' : 'updated'} successfully`,
          variant: 'success'
        })
        queryClient.invalidateQueries({ queryKey: ['testExams'] })
        return navigate({
          to: '/test-exams',
          search: {
            pageNumber: 1,
            pageSize: 5,
            search: '',
            sort: '-createdAt'
          }
        })
      },
      onError: (error) => {
        if (
          !isAxiosError<{ errors: TMutateTestExamErrors }>(error) ||
          error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR
        ) {
          toast({
            title: `TestExam has been ${type === 'create' ? 'created' : 'updated'} failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })
          return
        }
        if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
          const fieldErrors = error.response?.data.errors
          const keys = Object.keys(fieldErrors) as (keyof TMutateTestExamErrors)[]
          keys.forEach((key) => form.setError(key, { message: fieldErrors[key] }))
          form.setFocus(keys[0])
          return
        }
        toast({
          title: `TestExam has been ${type === 'create' ? 'created' : 'updated'} failure`,
          description: error.message,
          variant: 'danger'
        })
      }
    })
  }

  const handleQuestionContentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: string,
    fieldChange: (value: TQuestionSchema[]) => void
  ) => {
    const newQuestions = form.getValues('questions').map((q) => {
      if (q.id !== questionId) return q
      q.content = e.target.value
      return q
    })

    fieldChange(newQuestions)
  }

  const handleCorrectRadioChange = (
    oldValue: string,
    value: string,
    questionId: string,
    fieldChange: (value: TQuestionSchema[]) => void
  ) => {
    console.log({ oldValue, value })

    const newQuestions = form.getValues('questions').map((q) => {
      if (q.id !== questionId) return q
      q.options[+oldValue].correct = false
      q.options[+value].correct = true
      return q
    })

    fieldChange(newQuestions)
    console.log({ value })
  }

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: string,
    optionIndex: number,
    fieldChange: (value: TQuestionSchema[]) => void
  ) => {
    const newQuestions = form.getValues('questions').map((q) => {
      if (q.id !== questionId) return q
      q.options[optionIndex].content = e.target.value
      return q
    })

    fieldChange(newQuestions)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center'>
                Code<span className='text-gradient text-3xl'>*</span>
              </FormLabel>
              <FormControl>
                <Input disabled={disabling} placeholder='Code...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center'>
                Test Name<span className='text-gradient text-3xl'>*</span>
              </FormLabel>
              <FormControl>
                <Input disabled={disabling} placeholder='Test Name...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='conditionPoint'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center'>
                Condition Point<span className='text-gradient text-3xl'>*</span>
              </FormLabel>
              <FormControl>
                <Input disabled={disabling} placeholder='Condition Point...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='duration'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center'>
                Duration (minutes)<span className='text-gradient text-3xl'>*</span>
              </FormLabel>
              <FormControl>
                <Input disabled={disabling} placeholder='Duration...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea disabled={disabling} placeholder='Description...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='questions'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Questions (min 2)</FormLabel>
              <FormControl>
                <div className='flex flex-col gap-y-4'>
                  {field.value.map((question, index) => (
                    <FormItem key={question.id}>
                      <FormControl>
                        <div className='flex flex-col rounded-2xl bg-card'>
                          <div className='flex items-center justify-between border-b-[3px] border-background px-5 py-3'>
                            <div className='flex items-center gap-x-3'>
                              <label className='font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                Question {index + 1}
                              </label>
                              {questionsContentError[index]?.message && (
                                <div className='text-sm font-medium leading-none text-danger'>
                                  {questionsContentError[index]?.message}
                                </div>
                              )}
                            </div>
                            <Button
                              disabled={field.value.length <= 2}
                              onClick={() => {
                                // ko cần check chỗ này, nhưng cứ check cho chắc
                                if (field.value.length > 2) {
                                  form.setValue(
                                    'questions',
                                    field.value.filter((q) => q.id !== question.id)
                                  )
                                }
                              }}
                              variant='ghost'
                              size='icon'
                            >
                              <img
                                alt='delete'
                                src='/icons/actions/delete.svg'
                                className='size-6 select-none object-cover'
                              />
                            </Button>
                          </div>
                          <div className='grid grid-cols-12 gap-x-6 p-5'>
                            <div className='col-span-6'>
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder={`Question ${index + 1}`}
                                    value={question.content}
                                    onChange={(e) => handleQuestionContentChange(e, question.id!, field.onChange)}
                                  />
                                </FormControl>

                                {questionsContentError[index]?.content?.message && (
                                  <div className='text-sm font-medium text-danger'>
                                    {questionsContentError[index]?.content?.message}
                                  </div>
                                )}
                              </FormItem>
                            </div>
                            <RadioGroup
                              value={String(question.options.findIndex((o) => o.correct))}
                              onValueChange={(value) =>
                                handleCorrectRadioChange(
                                  String(question.options.findIndex((o) => o.correct)), // old value
                                  value,
                                  question.id!,
                                  field.onChange
                                )
                              }
                              className='col-span-6 flex flex-col gap-y-3'
                            >
                              {['A', 'B', 'C', 'D'].map((option, i) => (
                                <FormItem key={option}>
                                  <FormControl>
                                    <div className='flex items-center gap-x-2'>
                                      <RadioGroupItem value={String(i)} />
                                      <p className='font-bold'>{option}.</p>
                                      <Input
                                        value={question.options[i].content}
                                        onChange={(e) => handleOptionChange(e, question.id!, i, field.onChange)}
                                        placeholder={`Option ${option}...`}
                                      />
                                    </div>
                                  </FormControl>
                                  {questionsContentError[index]?.options?.[i]?.content?.message && (
                                    <div className='text-sm font-medium text-danger'>
                                      {questionsContentError[index]?.options?.[i]?.content?.message}
                                    </div>
                                  )}
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  ))}
                  <div
                    onClick={() => {
                      form.setValue('questions', [...field.value, getOneExampleQuestion()])
                    }}
                    className='group flex cursor-pointer items-center justify-center rounded-2xl bg-card py-10 text-lg font-bold'
                  >
                    <Plus className='mr-1 size-5 font-extrabold group-hover:text-[#6e38e0]' />
                    <p className='group-hover:text-gradient'>MORE QUESTION</p>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='float-right' disabled={disabling}>
          {type === 'create' ? 'Submit' : 'Save'} {disabling && <Loader2 className='ml-1 size-4 animate-spin' />}
        </Button>
      </form>
    </Form>
  )
}

export default TestExamForm
