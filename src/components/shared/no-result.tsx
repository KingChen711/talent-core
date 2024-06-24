import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

import { Button } from '../ui/button'

type Props = {
  title: string
  link?: string
  linkTitle?: string
  className?: string
}

function NoResult({ title, link, linkTitle, className }: Props) {
  return (
    <div className={cn('flex w-full flex-col items-center justify-center', className)}>
      {/* <img
        src='/assets/images/dark-illustration.png'
        alt='no result'
        className='hidden size-[270px] object-contain dark:flex'
      /> */}
      <h2 className='mt-8 text-[24px] font-bold leading-[31.2px]'>{title}</h2>
      {link && (
        <Link to={link}>
          <Button className='mt-5 min-h-[46px] rounded-lg px-4 py-3 text-[16px] font-medium leading-[22.4px]'>
            {linkTitle}
          </Button>
        </Link>
      )}
    </div>
  )
}

export default NoResult
