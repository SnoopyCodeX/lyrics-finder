import { ReactNode } from 'react'

const Navbar = ({ children }: { children: ReactNode }) => {
  return (
    <div className='navbar bg-secondary text-primary'>
        { children }
    </div>
  )
}

Navbar.Brand = ({ brand }: { brand: string }) => (
  <div className='flex-1'>
    <a href="/" className="btn btn-ghost text-xl md:text-md">
        { brand }
    </a>
  </div>
)

Navbar.Actions = ({ children }: { children: ReactNode }) => (
  <div className='flex-none gap-2'>
    { children }
  </div>
)

Navbar.AvatarWithDropdown = ({ src, children }: { src: string, children: ReactNode }) => (
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full hover:ring hover:ring-offset-base-100 hover:ring-primary hover:ring-offset-2">
                <img alt="Avatar" src={src} />
            </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-secondary rounded-box w-52">
            { children }
        </ul>
    </div>
)

Navbar.DropdownItem = ({ active, children }: { children: ReactNode, active?: boolean }) => (
  <li className={`${active ? 'active' : ''}`}>
    { children }
  </li>
)

Navbar.Avatar = ({ src }: { src: string }) => (
  <div className='avatar'>
    <div className='rounded-full w-10 ring ring-primary ring-offset-base-100 ring-offset-2'>
      <img src={ src } alt="avatar" />
    </div>
  </div>
)

export default Navbar