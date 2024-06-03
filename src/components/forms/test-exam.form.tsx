import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import useTestExam from '@/hooks/test-exam/use-test-exam'
import { useNavigate } from '@tanstack/react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { getExampleQuestions, getOneExampleQuestion, isAxiosError } from '@/lib/utils'
import { StatusCodes } from 'http-status-codes'
import { editorPlugin, testExamsPageSize } from '@/constants'
import {
  TMutateTestExamErrors,
  TMutationTestExamSchema,
  TQuestionSchema,
  mutationTestExamSchema
} from '@/lib/validation/test-exam.validation'

import { Loader2, Plus } from 'lucide-react'
import { Editor } from '@tinymce/tinymce-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import useMutateTestExam from '@/hooks/test-exam/use-mutate-test-exam'
import { toast } from '@/components/ui/use-toast'

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

  const questionsErrors = useMemo(() => form.formState.errors.questions || [], [form.formState.errors])

  const { mutate, isPending } = useMutateTestExam(type)

  // Get updated test exam
  const { isLoading } = useTestExam(testExamId, (testExam) => {
    form.setValue('code', testExam.code)
    form.setValue('name', testExam.name)
    form.setValue('description', testExam.description || '')
    form.setValue('duration', testExam.duration)
    form.setValue('conditionPoint', testExam.conditionPoint)
    form.setValue('questions', testExam.questions)
  })

  const disabling = useMemo(() => isPending || isLoading, [isPending, isLoading])

  const onSubmit = async (values: TMutationTestExamSchema) => {
    values.questions.map((q) => {
      q.id = undefined
      return q
    })

    if (type === 'update') {
      values.id = testExamId
    }

    mutate(values, {
      onSuccess: () => {
        toast({
          title: `Test exam has been ${type === 'create' ? 'created' : 'updated'} successfully`,
          variant: 'success'
        })

        return navigate({
          to: '/test-exams',
          search: {
            pageNumber: 1,
            pageSize: testExamsPageSize,
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
            title: `Test exam has been ${type === 'create' ? 'created' : 'updated'} failure`,
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
          title: `Test exam has been ${type === 'create' ? 'created' : 'updated'} failure`,
          description: error.message,
          variant: 'danger'
        })
      }
    })
  }

  const handleQuestionContentChange = (
    value: string,
    questionId: string,
    fieldChange: (value: TQuestionSchema[]) => void
  ) => {
    const newQuestions = form.getValues('questions').map((q) => {
      if (q.id !== questionId) return q
      q.content = value
      return q
    })

    fieldChange(newQuestions)
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

  const handleCorrectRadioChange = (
    oldValue: string,
    value: string,
    questionId: string,
    fieldChange: (value: TQuestionSchema[]) => void
  ) => {
    const newQuestions = form.getValues('questions').map((q) => {
      if (q.id !== questionId) return q
      q.options[+oldValue].correct = false
      q.options[+value].correct = true
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
                Code<span className='text-gradient text-2xl font-bold leading-none'>*</span>
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
                Test Name<span className='text-gradient text-2xl font-bold leading-none'>*</span>
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
                Condition Point<span className='text-gradient text-2xl font-bold leading-none'>*</span>
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
                Duration (minutes)<span className='text-gradient text-2xl font-bold leading-none'>*</span>
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
                              {questionsErrors[index]?.message && (
                                <div className='text-sm font-medium leading-none text-danger'>
                                  {questionsErrors[index]?.message}
                                </div>
                              )}
                            </div>
                            <Button
                              disabled={field.value.length <= 2}
                              onClick={() => {
                                // ko cần check chỗ này vì đã check disable ở trên, nhưng cứ check cho chắc
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
                          <div className='flex flex-col gap-y-4 p-4 py-2'>
                            <div>
                              <FormItem>
                                <FormControl>
                                  <Editor
                                    apiKey={import.meta.env.VITE_TINY_EDITOR_API_KEY}
                                    init={{
                                      ...editorPlugin,
                                      skin: 'oxide-dark',
                                      content_css: 'dark'
                                    }}
                                    onEditorChange={(value) =>
                                      handleQuestionContentChange(value, question.id!, field.onChange)
                                    }
                                    value={question.content}
                                  />
                                </FormControl>

                                {questionsErrors[index]?.content?.message && (
                                  <div className='text-sm font-medium text-danger'>
                                    {questionsErrors[index]?.content?.message}
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
                              className='flex flex-col gap-y-3'
                            >
                              {['A', 'B', 'C', 'D'].map((option, i) => (
                                <FormItem key={option}>
                                  <FormControl>
                                    <div className='flex items-center gap-x-2'>
                                      <label className='flex cursor-pointer items-center gap-x-2'>
                                        <RadioGroupItem value={String(i)} />
                                        <p className='font-bold'>{option}.</p>
                                      </label>
                                      <Input
                                        value={question.options[i].content}
                                        onChange={(e) => handleOptionChange(e, question.id!, i, field.onChange)}
                                        placeholder={`Option ${option}...`}
                                      />
                                    </div>
                                  </FormControl>
                                  {questionsErrors[index]?.options?.[i]?.content?.message && (
                                    <div className='text-sm font-medium text-danger'>
                                      {questionsErrors[index]?.options?.[i]?.content?.message}
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
