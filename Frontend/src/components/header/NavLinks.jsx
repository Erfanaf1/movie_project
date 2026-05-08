import React from 'react'
import NavItem from './NavItem'
import homeIcon from '../../assets/icons/home.svg'
import moviesIcon from '../../assets/icons/movies.svg'

const links = [
  { to: '/', label: 'صفحه اصلی' , icon: homeIcon },
  { to: '/movies', label: 'فیلم ها' , icon : moviesIcon },
]

const NavLinks = () => {
  return (
    <nav className='flex gap-10'>

      {links.map(link => (
        <NavItem key={link.to} to={link.to} label={link.label} icon={link.icon} />
      ))}


    </nav>
  )
}

export default NavLinks