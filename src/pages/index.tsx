import React, {useEffect, useState} from 'react'
import { Image } from '@/types'
import { HeroBanner, GalleryImage } from '../components'
import { getFeatured } from '@/lib'

const Home = () => {
  const [images, setImages]= useState<Image[]>([])
  useEffect(() => {
    getFeatured()
      .then((value) => {
        if (value.images.length > 0){
          setImages(value.images)
        }
        console.log(images)
      })
  }, [])
  return (
    <>
        <HeroBanner/>
        <div className="products-heading">
            <h2>Featured</h2>
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

export default Home