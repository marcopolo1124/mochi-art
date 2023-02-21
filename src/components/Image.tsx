import React from 'react'
import Image from 'next/image'
import { Image as ImageType } from '@/types'
import Link from 'next/link'

const apiRoute = process.env.NEXT_PUBLIC_SERVER_URL?process.env.NEXT_PUBLIC_SERVER_URL: ""
const GalleryImage = ({title, file_name}: ImageType) => {
  const src = `${apiRoute}/static/images_gallery/${file_name}`
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