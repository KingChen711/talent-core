import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Link } from '@tanstack/react-router'

type Props = {
  recruitmentDriveId: string
}

function DropdownSettingRecruitmentDrive({ recruitmentDriveId }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <img alt='settings' src='/icons/actions/settings.svg' className='size-6 select-none object-cover' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='border-2'>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link to={`/recruitment-drives/${recruitmentDriveId}/edit`} className='flex items-center gap-x-2'>
            <img alt='edit' src='/icons/actions/edit.svg' className='size-4' />
            Update
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownSettingRecruitmentDrive
