import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({to , label , icon}) => {
  return (
    <Link to={to} className='flex items-center gap-2 px-2 py-1 rounded-xl transition hover:bg-[#234223]'>
      <img src={icon} alt="" className='w-8' />
      <span className='whitespace-nowrap font-medium text-l'>{label}</span>
    </Link>
  )
}

export default NavItem
