import React from 'react'
import Link from 'next/link'

const AdminNav = ({handleLogout}: {handleLogout: ()=>void}) => {
  return (
    <nav>
      <div className='navbar-container' id="admin-nav">
        <div className='navbar-menu'>
            <Link href="/admin"><span className='admin-menu-item'>Site Settings</span></Link>
            <div><span className='admin-menu-item' onClick={handleLogout}>Logout</span></div>
            
        </div>
      </div>
    </nav>
    
  )
}


export default AdminNav