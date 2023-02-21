import React from 'react'
import Link from 'next/link'
import {signOut } from 'next-auth/react'

const AdminNav = () => {
  return (
    <nav>
      <div className='navbar-container' id="admin-nav">
        <div className='navbar-menu' id="admin-nav-menu">
            <Link href="/admin/state"><span className='admin-menu-item'>Site Settings</span></Link>
            <Link href="/admin/gallery"><span className='admin-menu-item'>Gallery Settings</span></Link>
            <Link href="/admin/commissions"><span className='admin-menu-item'>Commissions</span></Link>
            <div><span className='admin-menu-item' onClick={() => {signOut()}}>Logout</span></div>
            
        </div>
      </div>
    </nav>
    
  )
}


export default AdminNav