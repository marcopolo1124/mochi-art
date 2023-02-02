import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className='navbar-container'>
        <p className='logo'>
          <Link href="/">MIIYACHI</Link>
        </p>
        <div className='navbar-menu'>
          <span className='navbar-menu-item'>Gallery</span>
          <span className='navbar-menu-item'>Commissions</span>
          <span className='navbar-menu-item'>Terms of Service</span>
          <button className='navbar-menu-item'>Contact</button>
        </div>
      </div>
    </div>
    
  )
}

export default Navbar