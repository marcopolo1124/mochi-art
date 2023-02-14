import React, {useState, useEffect} from 'react'
import { Image as ImageType} from '@/types'
import Image from 'next/image'
import { getFeatured } from '@/lib'


type Images = ImageType[]
type imagesProps = {images: Images}

const EditGallery = ({images}: imagesProps) => {
    const [selectedImage, setSelectedImage] = useState<Images>([])

    return (
        <>
        <div className="products-heading">
            <h2>Edit Gallery</h2>
        </div>

        <div className='products-container'>
            {images?.map( image => <GalleryImage
            key={image.file_name}
            title={image.title}
            file_name={image.file_name}
            image_description={image.image_description}
            date_posted={image.date_posted}
            featured={image.featured}/>)}
        </div>
        </>
    )
}

function GalleryImage({title, file_name}: ImageType) {
    const src = `${process.env.NEXT_PUBLIC_SERVER_URL}/static-gallery/${file_name}`
    return (
      <div className="product-card">
          <Image 
            src={src}
            className="product-image"
            height={300}
            width={300}
            alt={title}
          />
      </div>
    )
  }

export default EditGallery