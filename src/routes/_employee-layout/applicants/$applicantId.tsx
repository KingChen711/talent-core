import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import useApplicant from '@/hooks/applicant/use-applicant'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/applicants/$applicantId')({
  component: ApplicantDetailPage
})

function ApplicantDetailPage() {
  const router = useRouter()
  const { applicantId } = Route.useParams()
  const { data, isLoading } = useApplicant(applicantId)

  // TODO: Skeleton
  if (isLoading) {
    return <div>Skeleton</div>
  }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='mb-5 text-2xl font-semibold'>Applicant Detail</div>
        <Button variant='secondary' onClick={() => router.history.back()}>
          <img className='size-5' src='/icons/actions/back.svg' />
          Back
        </Button>
      </div>

      <div className='flex flex-col'>
        <div className='flex items-center gap-x-4'>
          <Label>Email:</Label>
          <p>{data!.email}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>Fullname:</Label>
          <p>{data!.fullName}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>Email:</Label>
          <p>{data!.email}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>Email:</Label>
          <p>{data!.email}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>Email:</Label>
          <p>{data!.email}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>Email:</Label>
          <p>{data!.email}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>Email:</Label>
          <p>{data!.email}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>Email:</Label>
          <p>{data!.email}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>Email:</Label>
          <p>{data!.email}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>Email:</Label>
          <p>{data!.email}</p>
        </div>
      </div>
    </div>
  )
}

export default ApplicantDetailPage
