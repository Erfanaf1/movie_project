import React from 'react'
import NavItem from './NavItem'

const links = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/favorites', label: 'Favorites' },
]

const NavLinks = () => {
  return (
    <nav className='flex'>

      {links.map(link => (
        <NavItem key={link.to} to={link.to} label={link.label} />
      ))}
    </nav>
  )
}

export default NavLinks