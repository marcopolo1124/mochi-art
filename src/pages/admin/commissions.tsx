import { RouteGuard } from '@/components'
import React from 'react'

const commissions = () => {
  return (
    <RouteGuard>
        <div className='layout'>
            <div className='home'>
                <h2>Commissions</h2>
            </div>
        </div>
    </RouteGuard>
  )
}

export default commissions