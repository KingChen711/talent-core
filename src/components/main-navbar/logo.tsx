import { Link } from '@tanstack/react-router'

function Logo() {
  return (
    <Link to='/opening-jobs' className='flex items-center gap-x-1'>
      <img src='/icons/logo.svg' className='size-8 object-cover' />
      <div className='text-2xl font-bold max-sm:hidden'>TalentCore</div>
    </Link>
  )
}

export default Logo
