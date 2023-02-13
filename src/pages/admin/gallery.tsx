import { getFeatured, getImages } from '@/lib'
import React from 'react'


const gallery = () => {
  return (
    <div>gallery</div>
  )
}

export default gallery

export async function getServerSideProps() {
    const featured = await getFeatured()
    const gallery = await getImages("date", 1, 1000)
    return {props: {featured, gallery}}
  
  }
  