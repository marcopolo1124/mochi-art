import React, {useState, useEffect} from 'react'
import { Image } from 'types'
import { getImages } from '@/lib'
import GalleryImage from './Image'

type Images = Image[]
type imagesProps = {images: Images}

const Gallery = ({images}: imagesProps) => {

    return (
        <>
        <div className="products-heading">
            <h2>Gallery</h2>
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

export default Gallery