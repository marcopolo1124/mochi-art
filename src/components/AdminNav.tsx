import React from 'react'
import Link from 'next/link'

const AdminNav = ({handleLogout}: {handleLogout: ()=>void}) => {
  return (
    <nav>
      <div className='navbar-container'>
        <div className='navbar-menu'>
            <span className='navbar-menu-item' onClick={handleLogout}>Logout</span>
        </div>
      </div>
    </nav>
    
  )
}


export default AdminNav