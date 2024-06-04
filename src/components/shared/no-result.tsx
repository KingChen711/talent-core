import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

type Props = {
  title: string
  description: string
  link?: string
  linkTitle?: string
}

function NoResult({ title, description, link, linkTitle }: Props) {
  return (
    <div className='mt-10 flex w-full flex-col items-center justify-center'>
      {/* <img
        src='/assets/images/dark-illustration.png'
        alt='no result'
        className='hidden size-[270px] object-contain dark:flex'
      /> */}
      <h2 className='mt-8 text-[24px] font-bold leading-[31.2px]'>{title}</h2>
      <p className='my-3.5 max-w-md text-center text-[14px] font-normal leading-[19.6px]'>{description}</p>
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
