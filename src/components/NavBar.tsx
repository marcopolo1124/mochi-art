import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className='navbar-container'>
        <div className='logo'>
          <Link href="/">MIIYACHI</Link>
        </div>
        <div className='navbar-menu'>
          {/* <Link href=""><span className='navbar-menu-item'>Gallery</span></Link> */}
          {/* <Link href="/commissions"><span className='navbar-menu-item'>Commissions</span></Link> */}
          {/* <Link href="/terms-of-service"><span className='navbar-menu-item' >Terms of Service</span></Link> */}
          {/* <Link href=""><span className='navbar-menu-item'>Contact</span></Link> */}
        </div>
      </div>
    </div>
    
  )
}


export default Navbar