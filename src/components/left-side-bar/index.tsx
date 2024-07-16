import { employeeRoutes } from '@/constants'
import { cn } from '@/lib/utils'
import { Link, useLocation } from '@tanstack/react-router'

function LeftSideBar() {
  const { pathname } = useLocation()

  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit shrink-0 flex-col justify-between overflow-y-auto border-r pr-9 pt-24 dark:shadow-none max-lg:px-6 max-sm:hidden lg:w-[300px]'>
      <div className='flex flex-col'>
        {employeeRoutes.map((item) => {
          const isActive = (pathname.startsWith(item.route) && item.route.length > 1) || pathname === item.route

          return (
            <Link
              search={() => ({
                pageNumber: 1,
                pageSize: 5,
                search: '',
                sort: '-createdAt',
                status: 'All'
              })}
              key={item.route}
              to={item.route}
              className={cn(
                'flex items-center justify-start gap-4 p-4 lg:pl-9 text-muted',
                isActive && 'bg-gradient rounded-r-full max-lg:rounded-lg text-gradient-foreground'
              )}
            >
              <img src={item.icon(isActive)} alt={item.label} width={20} height={20} />

              <p className={cn('max-lg:hidden', isActive && 'font-semibold')}>{item.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default LeftSideBar
