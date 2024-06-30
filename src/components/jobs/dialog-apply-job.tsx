import { useAuthContext } from '@/contexts/auth-provider'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import ApplicationForm from '../forms/application.form'

type Props = {
  jobCode: string
  recruitmentDriveCode: string
}

function DialogApplyJob({ jobCode, recruitmentDriveCode }: Props) {
  const context = useAuthContext()
  const user = context.user!

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='text-gradient text-base'>
          Apply Job
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[85%] w-[600px] max-w-[96%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Apply Job</DialogTitle>
          <DialogDescription asChild>
            <ApplicationForm
              candidateView
              initialStates={{
                bornYear: user.bornYear || undefined,
                email: user.email,
                fullName: user.fullName,
                gender: user.gender || undefined,
                phone: user.phone || undefined
              }}
              jobCode={jobCode}
              recruitmentDriveCode={recruitmentDriveCode}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogApplyJob
