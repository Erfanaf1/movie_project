import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({to , label}) => {
  return (
    <Link to={to}>
      <p>{label}</p>
    </Link>
  )
}

export default NavItem
