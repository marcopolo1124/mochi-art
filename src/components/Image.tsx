import React from 'react'
import Image from 'next/image'
import { Image as ImageType } from '@/types'
import Link from 'next/link'
const GalleryImage = ({title, file_name}: ImageType) => {
  const src = `${process.env.NEXT_PUBLIC_SERVER_URL}/static-gallery/${file_name}`
  return (
    <div className="product-card">
      <Link href={`image/${file_name}`}>
        <Image 
          src={src}
          className="product-image"
          height={300}
          width={300}
          alt={title}
        />
      </Link>
    </div>
  )
}

export default GalleryImage