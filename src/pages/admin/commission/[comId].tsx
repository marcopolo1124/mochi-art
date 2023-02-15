import React from 'react'
import { useRouter } from 'next/router'

const Commission = () => {
  const router = useRouter()
  const {comId} = router.query
  return (
    <div>Commission</div>
  )
}

export default Commission