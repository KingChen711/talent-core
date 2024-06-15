import Logo from './logo'
import { employeeRoutes } from '@/constants'
import { cn } from '@/lib/utils'
import { Link, useLocation } from '@tanstack/react-router'

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'

function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <img src='/icons/side-bar/menu.svg' alt='Menu' width={30} height={30} className='sm:hidden' />
      </SheetTrigger>
      <SheetContent side='left' className='border-none pl-0'>
        <div className='pl-8'>
          <Logo />
        </div>

        <SheetClose asChild>
          <NavContent />
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar

const NavContent = () => {
  const { pathname } = useLocation()
  return (
    <section className='flex h-full flex-col gap-y-3 pt-6'>
      {employeeRoutes.map((item) => {
        const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route

        return (
          <SheetClose asChild key={item.route}>
            <Link
              to={item.route}
              className={cn(
                'flex items-center justify-start gap-4 bg-transparent p-4 px-8',
                isActive && 'bg-gradient rounded-r-full'
              )}
            >
              <img
                src={item.icon(isActive)}
                alt={item.label}
                width={20}
                height={20}
                className={cn(!isActive && 'invert-colors')}
              />
              <p className={cn(isActive ? 'base-bold' : 'base-medium')}>{item.label}</p>
            </Link>
          </SheetClose>
        )
      })}
    </section>
  )
}
