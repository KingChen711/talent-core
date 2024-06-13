import { Button } from '@/components/ui/button'
import useApplication from '@/hooks/application/use-application'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/applications/$applicationId')({
  component: ApplicationDetailPage
})

function ApplicationDetailPage() {
  const router = useRouter()
  const { applicationId } = Route.useParams()
  const { data, isLoading } = useApplication(applicationId)

  console.log({ data })

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='mb-5 text-2xl font-semibold'>Application Detail</div>
        <Button variant='secondary' onClick={() => router.history.back()}>
          <img className='size-5' src='/icons/actions/back.svg' />
          Back
        </Button>
      </div>
    </div>
  )
}

export default ApplicationDetailPage
