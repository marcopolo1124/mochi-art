import React from 'react'
import { Image } from '@/types'
import Link from 'next/link'
const GalleryImage = ({title, file_name}: Image) => {
  return (
    <div className="product-card">
      <Link href={`image/${file_name}`}>
        <img 
          src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${file_name}`}
          className="product-image"
        />
      </Link>

    </div>
  )
}

export default GalleryImage