import React from 'react'
import Link from 'next/link'

const AdminNav = ({handleLogout}: {handleLogout: ()=>void}) => {
  return (
    <nav>
      <div className='navbar-container' id="admin-nav">
        <div className='navbar-menu' id="admin-nav-menu">
            <Link href="/admin"><span className='admin-menu-item'>Site Settings</span></Link>
            <Link href="/admin/gallery"><span className='admin-menu-item'>Gallery Settings</span></Link>
            <Link href="/admin/commissions"><span className='admin-menu-item'>Commissions</span></Link>
            <div><span className='admin-menu-item' onClick={handleLogout}>Logout</span></div>
            
        </div>
      </div>
    </nav>
    
  )
}


export default AdminNav