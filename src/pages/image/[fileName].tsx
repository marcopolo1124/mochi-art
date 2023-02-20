import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getImage } from '@/lib'
import { Image as ImageType } from '@/types'
import Image from 'next/image'

const ImageDetail = () => {
  
  const router = useRouter()
  const {fileName} = router.query

  const [imageDetail, setImageDetail] = useState<ImageType>({
    title: "",
    file_name: "",
    image_description: "",
    date_posted: "",
    featured: false
  })

  useEffect(() => {
    if (typeof(fileName) !== "string"){
        return
    }
    getImage(fileName)
        .then(({image}) => {
            setImageDetail(image)
        })
        .catch((error) => {
            console.log(error)
        })
  }, [fileName])
  return (
    <div className="layout">
        <main className="image-page-container">
            {imageDetail.file_name? <ImageContainer image={imageDetail}/>: <h2>404</h2>}
        </main>   
    </div>
  )
}

type ImageProp = {image: ImageType}

function ImageContainer({image}: ImageProp){
    const {file_name, image_description, title, date_posted} = image
    const dateString = new Date(date_posted).toLocaleDateString()
    const parseDetail = (string: String) => string.split('\n').map((line, index) => <p key={`${line}${index}`}>{line}</p>)
    const src = `/images_gallery/${file_name}`
    return (
        <div>
            <div className="image-container">
                <Image
                    alt={title}
                    className="main-image"
                    src={src}
                    height={500}
                    width={1400}
                />
            </div>
            
            <div className="image-detail-container">
                <h2>{title}</h2>
                <p id="date-posted">{dateString}</p>
                <div className="image-description">
                    {parseDetail(image_description)}
                </div>
            </div>

        </div>
    )
}

export default ImageDetail