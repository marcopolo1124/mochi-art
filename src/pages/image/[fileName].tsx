import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getImage } from '@/lib'
import { Image } from '@/types'

const ImageDetail = () => {
  
  const router = useRouter()
  const {fileName} = router.query

  const [imageDetail, setImageDetail] = useState<Image>({
    title: "",
    file_name: "",
    image_description: "",
    date_posted: "",
    featured: false
  })

  useEffect(() => {
    if (typeof(fileName) !== "string"){
        console.log('error')
        console.log(typeof(fileName))
        return
    }
    getImage(fileName)
        .then(({image}) => {
            console.log('image')
            console.log(image)
            setImageDetail(image)
        })
        .catch((error) => {
            console.log(error)
        })
  }, [fileName])
  return (
    <div>
        <main className="image-page-container">
            {imageDetail.file_name? <ImageContainer image={imageDetail}/>: <h2>404</h2>}
        </main>   
    </div>
  )
}

type ImageProp = {image: Image}

function ImageContainer({image}: ImageProp){
    const {file_name, image_description, title, date_posted} = image
    const dateString = new Date(date_posted).toLocaleDateString()
    const parseDetail = (string: String) => string.split('\n').map(line => <p>{line}</p>)
    console.log(JSON.stringify(image_description))
    return (
        <div>
            <div className="image-container">
                <img className="main-image" src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${file_name}`} />
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