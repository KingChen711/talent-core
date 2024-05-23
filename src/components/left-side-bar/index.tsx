import { SignedOut } from '@clerk/clerk-react'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

function LeftSideBar() {
  return (
    <section className='custom-scrollbar sticky left-0 top-0 flex h-screen w-fit shrink-0 flex-col justify-between overflow-y-auto border-r p-9 pt-20 dark:shadow-none max-sm:hidden lg:w-[300px]'>
      {/* LeftSideBar */}
      <SignedOut>
        <div className='flex flex-col gap-3'>
          <Link href='/sign-in'>
            <Button className='min-h-[41px] w-full rounded-lg px-4 py-3 text-[12px] font-medium leading-[15.6px]'>
              <span className='text-gradient max-lg:hidden'>Log In</span>
              <img src='/assets/icons/account.svg' alt='login' width={20} height={20} className='lg:hidden' />
            </Button>
          </Link>

          <Link href='/sign-up'>
            <Button className='min-h-[41px] w-full rounded-lg px-4 py-3 text-[12px] font-medium leading-[15.6px]'>
              <span className='max-lg:hidden'>Sign Up</span>
              <img src='/assets/icons/sign-up.svg' alt='sign-up' width={20} height={20} className='lg:hidden' />
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  )
}

export default LeftSideBar
