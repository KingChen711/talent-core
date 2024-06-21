import { toDate, toDateTime } from '@/lib/utils'
import { ApplicationStatus, TestExam, TestSession, TestSessionWish } from '@prisma/client'

import TestSessionBadge from '@/components/shared/test-session-badge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import DialogSaveApplication from '../../application/dialog-save-application'
import DialogScheduleTestExam from '../../application/dialog-schedule-test-exam'
import DialogRequestChangeTestDate from '../../wish/dialog-request-change-test-date'

type Props = {
  isCandidateView: boolean
  status: ApplicationStatus
  jobCode: string
  applicationId: string
  testSession:
    | (TestSession & {
        testExam: TestExam & {
          countQuestions: number
        }
        testSessionWish: TestSessionWish | null
      })
    | null
}

function TestingStage({ status, applicationId, jobCode, testSession, isCandidateView }: Props) {
  if (status === 'Saved' && !testSession?.testDate) return null

  const hasPermissionViewFullInfor = !isCandidateView || (testSession && testSession.status !== 'Processing')

  return (
    <div className='z-10 flex items-center gap-x-2'>
      <div className='flex items-center gap-x-2'>
        {status === 'Screening' ? (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-border'>2</div>
        ) : status === 'Testing' ? (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-warning'>
            <img alt='progress' src='/icons/hourglass.svg' className='size-5' />
          </div>
        ) : (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-success'>
            <img alt='progress' src='/icons/check.svg' className='size-5' />
          </div>
        )}

        <div className='flex w-28 shrink-0 flex-col gap-y-1'>
          <div className='line-clamp-1 flex flex-col font-bold leading-none'>Testing</div>
          {testSession?.testDate && (
            <div className='line-clamp-1 text-xs leading-none text-muted-foreground'>
              {toDate(testSession.testDate)}
            </div>
          )}
        </div>
      </div>

      {!isCandidateView && status === 'Screening' && (
        <div className='flex gap-x-4'>
          <DialogScheduleTestExam applicationId={applicationId} jobCode={jobCode} />
          <DialogSaveApplication applicationId={applicationId} />
        </div>
      )}

      {testSession && testSession.testDate && (
        <div className='grid w-full grid-cols-12 gap-4 rounded-lg bg-border p-4 text-sm'>
          {hasPermissionViewFullInfor && (
            <p className='col-span-6 font-bold'>
              Name: <span className='font-normal'>{testSession.testExam.name}</span>
            </p>
          )}

          <p className='col-span-6 font-bold'>
            Test Date: <span className='font-normal'>{toDateTime(testSession.testDate)}</span>
          </p>

          {hasPermissionViewFullInfor && (
            <p className='col-span-6 font-bold'>
              Code: <span className='font-normal'>{testSession.testExam.code}</span>
            </p>
          )}

          <div className='col-span-6 flex items-center gap-x-1'>
            <p className='font-bold'>
              Point: <span className='font-normal'>{testSession.point || '_'} / 10</span>
            </p>

            {hasPermissionViewFullInfor && (
              <p className='text-muted-foreground'>( Require Point: {testSession.testExam.conditionPoint} ) </p>
            )}
          </div>

          {hasPermissionViewFullInfor && (
            <div className='z-10 col-span-6 flex flex-wrap gap-x-2'>
              <Badge className='pointer-events-none w-fit bg-[#d1d1d1] py-1 font-normal text-card-foreground dark:bg-card dark:text-white'>
                {testSession.testExam.countQuestions} questions
              </Badge>
              <Badge className='pointer-events-none w-fit bg-[#d1d1d1] py-1 font-normal text-card-foreground dark:bg-card dark:text-white'>
                {testSession.testExam.duration} minutes
              </Badge>
            </div>
          )}

          <div className='col-span-6 flex items-center gap-x-2'>
            <p className='font-bold'>Status: </p>
            <TestSessionBadge status={testSession.status} />
          </div>

          {!isCandidateView &&
            testSession.status === 'Processing' &&
            new Date(testSession.testDate).getTime() >= Date.now() && (
              <div className='col-span-12 mt-4'>
                <DialogScheduleTestExam
                  editMode
                  applicationId={applicationId}
                  jobCode={jobCode}
                  testDate={new Date(testSession.testDate)}
                  testExamCode={testSession.testExamCode}
                />
              </div>
            )}

          {isCandidateView && testSession.status === 'Processing' && (
            <div className='col-span-12 mt-4 flex flex-wrap gap-4'>
              <Button disabled={new Date(testSession.testDate).getTime() > Date.now()} className='flex-1'>
                Take The Test
              </Button>

              {!testSession.testSessionWish && new Date(testSession.testDate).getTime() > Date.now() && (
                <DialogRequestChangeTestDate applicationId={applicationId} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TestingStage
