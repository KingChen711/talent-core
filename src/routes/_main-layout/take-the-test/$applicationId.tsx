import { convertRemainTime, isBaseError } from '@/lib/utils'
import { useLocalStorage } from '@reactuses/core'
import { createFileRoute } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'
import { useEffect, useState } from 'react'

import useTakeTheTest from '@/hooks/test/use-take-the-test'

import ParseQuestion from '@/components/shared/parse-question'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'

export const Route = createFileRoute('/_main-layout/take-the-test/$applicationId')({
  component: TakeTheTestPage
})

function TakeTheTestPage() {
  const { applicationId } = Route.useParams()

  const { data, isLoading } = useTakeTheTest(applicationId, (error) => {
    if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
      toast({
        title: `Take the test failure`,
        description: 'Some thing went wrong.',
        variant: 'danger'
      })
      return
    }
    toast({
      title: `Take the test failure`,
      description: error.response?.data.message,
      variant: 'danger'
    })
  })

  const [remainTimeText, setRemainTimeText] = useState('')
  const [answers, setAnswers] = useLocalStorage<Record<string, string>>('answers', {})

  useEffect(() => {
    if (data && data.testExamCode !== localStorage.getItem('test-exam')) {
      localStorage.setItem('test-exam', data.testExamCode)
      setAnswers({})
    }
  }, [data])

  useEffect(() => {
    const updateRemainTime = () => {
      if (!data) return

      const now = Date.now()
      const expiredTime = new Date(data.testDate).getTime() + data.testExam.duration * 1000 * 60

      if (expiredTime <= now) {
        // TODO: submit test
        setRemainTimeText('00:00:00')
      }

      setRemainTimeText(convertRemainTime(expiredTime))
    }

    const timer = setInterval(() => updateRemainTime(), 1000)

    return () => {
      clearInterval(timer)
    }
  }, [data])

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

  // TODO: useEffect handle invalid answers from local storage

  useEffect(() => {
    console.log(answers)
  }, [answers])

  if (isLoading) return <div>Skeleton</div>
  if (!data) return <div>Not found</div>

  return (
    <div>
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
                <RadioGroup onValueChange={(value) => handleSelectAnswer(i, value)} className='ml-5'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem checked={answers?.[i] === 'A'} value='A' id={`${i}-A`} />
                    <Label className='cursor-pointer' htmlFor={`${i}-A`}>
                      A. {q.options[0].content}
                    </Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem checked={answers?.[i] === 'B'} value='B' id={`${i}-B`} />
                    <Label className='cursor-pointer' htmlFor={`${i}-B`}>
                      B. {q.options[1].content}
                    </Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem checked={answers?.[i] === 'C'} value='C' id={`${i}-C`} />
                    <Label className='cursor-pointer' htmlFor={`${i}-C`}>
                      C. {q.options[2].content}
                    </Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem checked={answers?.[i] === 'D'} value='D' id={`${i}-D`} />
                    <Label className='cursor-pointer' htmlFor={`${i}-D`}>
                      D. {q.options[3].content}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )
          })}

          <Button className='mx-auto mb-6 mt-8 w-fit'>Submit and Finish</Button>
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
