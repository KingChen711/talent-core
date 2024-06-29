import Actions from './actions'
import Logo from './logo'
import { cn } from '@/lib/utils'

type Props = {
  isHome?: boolean
}

function MainNavBar({ isHome = false }: Props) {
  return (
    <nav className={cn('fixed left-0 top-0 z-[49] w-full px-6 sm:px-14', !isHome && 'bg-background border-b')}>
      <div className='mx-auto flex h-20 w-full max-w-6xl items-center justify-between'>
        <Logo />
        <Actions />
      </div>
    </nav>
  )
}

export default MainNavBar
