import { convertRemainTime, isBaseError } from '@/lib/utils'
import { TAnswersSchema, answersSchema } from '@/lib/validation/test-exam.validation'
import { useLocalStorage } from '@reactuses/core'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import useSubmitTest from '@/hooks/test/use-submit-test'
import useTakeTheTest from '@/hooks/test/use-take-the-test'

import LogoLoading from '@/components/logo-loading'
import NoResult from '@/components/shared/no-result'
import ParseQuestion from '@/components/shared/parse-question'
import DialogSubmitTest from '@/components/test/dialog-submit-test'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'

export const Route = createFileRoute('/_main-layout/take-the-test/$applicationId')({
  component: TakeTheTestPage
})

function TakeTheTestPage() {
  const navigate = useNavigate()
  const { applicationId } = Route.useParams()

  const { data, isLoading } = useTakeTheTest(applicationId, (error) => {
    if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
      toast({
        title: `Take the test failure`,
        description: 'Some thing went wrong.',
        variant: 'danger'
      })
    } else {
      toast({
        title: `Take the test failure`,
        description: error.response?.data.message,
        variant: 'danger'
      })
    }

    return navigate({ to: `/my-applications/${applicationId}` })
  })

  const { mutate, isPending } = useSubmitTest()

  const [remainTimeText, setRemainTimeText] = useState('')
  const [answers, setAnswers] = useLocalStorage<TAnswersSchema>('answers', {})

  useEffect(() => {
    const checkAnswers = async () => {
      try {
        await answersSchema.parseAsync(answers)
      } catch (error) {
        setAnswers({})
      }
    }

    checkAnswers()
  }, [answers])

  useEffect(() => {
    if (data && data.testExamCode !== localStorage.getItem('test-exam')) {
      localStorage.setItem('test-exam', data.testExamCode)
      setAnswers({})
    }
  }, [data])

  useEffect(() => {
    const timer = setInterval(() => updateRemainTime(), 1000)

    function updateRemainTime() {
      if (!data || isPending) return

      const now = Date.now()
      const expiredTime = new Date(data.testDate).getTime() + data.testExam.duration * 1000 * 60

      if (expiredTime <= now) {
        setRemainTimeText('00:00:00')
        clearInterval(timer)
        return
      }

      setRemainTimeText(convertRemainTime(expiredTime))
    }

    return () => {
      clearInterval(timer)
    }
  }, [data])

  useEffect(() => {
    if (remainTimeText === '00:00:00') {
      mutate(
        { applicationId, data: { answers: answers || {} } },
        {
          onSuccess: () => {
            toast({
              title: `Submit test success`,
              variant: 'success'
            })
            return navigate({
              to: `/my-applications/${applicationId}`
            })
          },
          onError: (error) => {
            if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
              toast({
                title: `Submit test failure`,
                description: 'Some thing went wrong.',
                variant: 'danger'
              })
              return
            }
            toast({
              title: `Submit test failure`,
              description: error.response?.data.message,
              variant: 'danger'
            })
          }
        }
      )
    }
  }, [remainTimeText])

  const handleSelectAnswer = (questionNumber: number, answer: string) => {
    setAnswers({
      ...answers,
      [questionNumber]: answer
    })
  }

  const handleClearAnswer = (questionNumber: number) => {
    const clone = { ...answers }
    delete clone?.[questionNumber]
    setAnswers(clone)
  }

  if (isLoading) return <Loader2 className='mx-auto mt-12 size-12 animate-spin' />
  if (!data)
    return (
      <NoResult
        title='Not found test exam'
        linkTitle='Back To My Application'
        link={`/my-applications/${applicationId}`}
      />
    )

  return (
    <div>
      {isPending && (
        <div className='fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-y-1 bg-background/80 text-xl font-bold'>
          <LogoLoading showText={false} />
          Submitting your test, do not reload page.
        </div>
      )}
      <div className='my-8 text-2xl font-semibold'>
        Test Exam: {data.testExamCode}: {data.testExam.questions.length} questions ({data.testExam.duration} minutes){' '}
      </div>
      <div className='grid grid-cols-12 gap-x-16'>
        <div className='col-span-9 flex flex-col gap-y-6'>
          {data.testExam.questions.map((q, i) => {
            return (
              <div className='flex flex-col' key={q.id}>
                <div className='flex gap-x-2'>
                  <div className='font-bold'>{i + 1}.</div>
                  <ParseQuestion data={q.content} />
                </div>
                <div onClick={() => handleClearAnswer(i)} className='hover:text-gradient mb-4 ml-5 cursor-pointer'>
                  Clear answer
                </div>
                <RadioGroup
                  disabled={isPending}
                  onValueChange={(value) => handleSelectAnswer(i, value)}
                  className='ml-5'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem disabled={isPending} checked={answers?.[i] === 'A'} value='A' id={`${i}-A`} />
                    <Label className='cursor-pointer' htmlFor={`${i}-A`}>
                      A. {q.options[0].content}
                    </Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem disabled={isPending} checked={answers?.[i] === 'B'} value='B' id={`${i}-B`} />
                    <Label className='cursor-pointer' htmlFor={`${i}-B`}>
                      B. {q.options[1].content}
                    </Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem disabled={isPending} checked={answers?.[i] === 'C'} value='C' id={`${i}-C`} />
                    <Label className='cursor-pointer' htmlFor={`${i}-C`}>
                      C. {q.options[2].content}
                    </Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem disabled={isPending} checked={answers?.[i] === 'D'} value='D' id={`${i}-D`} />
                    <Label className='cursor-pointer' htmlFor={`${i}-D`}>
                      D. {q.options[3].content}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )
          })}

          <DialogSubmitTest answers={answers} applicationId={applicationId} isPending={isPending} mutate={mutate} />
        </div>
        <div className='relative col-span-3'>
          <div className='sticky flex h-fit flex-wrap gap-3'>
            {data.testExam.questions.map((q, i) => (
              <div
                className='flex h-16 min-w-[40px] max-w-[45px] flex-1 flex-col justify-between rounded-md border'
                key={q.id}
              >
                <p className='flex h-8 items-center justify-center'>{i + 1}</p>
                <div className='flex h-8 w-full items-center justify-center bg-card'>{answers?.[i]}</div>
              </div>
            ))}
          </div>
          <div className='mt-6 flex flex-wrap items-center gap-x-3 text-lg font-bold'>
            <p>Remain time:</p>
            <p className='font-normal'>{remainTimeText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TakeTheTestPage
