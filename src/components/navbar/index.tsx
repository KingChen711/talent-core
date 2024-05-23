import Logo from './logo'
import Actions from './actions'

function NavBar() {
  return (
    <nav className='fixed left-0 top-0 z-[49] flex h-20 w-full items-center justify-between border-b bg-background px-2 lg:px-4'>
      <Logo />

      <Actions />
    </nav>
  )
}

export default NavBar
