import React from 'react'
import { Image } from '@/types'
const GalleryImage = ({title, file_name}: Image) => {
  console.log(file_name)
  return (
    <div>
        <div className="product-card">
          <img 
            src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${file_name}`}
            width={250}
            height={250}
            className="product-image"
          />

        </div>
    </div>
  )
}

export default GalleryImage