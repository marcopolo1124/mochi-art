import React, {useState, useEffect} from 'react'
import { Image as ImageType} from '@/types'
import Image from 'next/image'
import {deleteImages} from '@/lib'
import { FiTrash } from 'react-icons/fi'
import GalleryImageForm from './GalleryImageForm'
import Popup from './Popup'

type Images = ImageType[]
type imagesProps = {images: Images}
const apiRoute = process.env.NEXT_PUBLIC_SERVER_URL?process.env.NEXT_PUBLIC_SERVER_URL: ""


const EditGallery = ({images}: imagesProps) => {
    const [showForm, setShowForm] = useState<boolean>(false)
    const [imageList, setImageList] = useState(images)
    const [selectedImage, setSelectedImage] = useState<ImageType[]>([])
    const handleSelect = (image: ImageType) => {
      return () => {setSelectedImage(prev => [...prev, image])}
    }
    const handleDeSelect = (image: ImageType) => {
      return () => {setSelectedImage(prev => prev.filter(img => img !== image))}
    }

    const handleDelete = () => {
      const filteredList = imageList.filter((image) => !selectedImage.includes(image))
      setImageList(filteredList)
      deleteImages(selectedImage)
      setSelectedImage([])
    }


    return (
        <div className="main-container">
        <Popup trigger={showForm} handleClick={() => {setShowForm(false)}}>
          <GalleryImageForm/>
        </Popup>
        <div className="products-heading">
            <h2>Edit Gallery</h2>
        </div>
        <div>
          <button id="trash-icon" onClick={handleDelete}><FiTrash/></button>
        </div>
        

        <div className='products-container'>
            {imageList?.map( image => <GalleryImage
            image={image}handleSelect={handleSelect} handleDeSelect={handleDeSelect}
            key={image.file_name}/>)}
            <div className="add-photo" onClick={() => {setShowForm(prev => !prev)}}>
              +
            </div>
        </div>
        </div>
    )
}

function GalleryImage({image, handleSelect, handleDeSelect}: {image: ImageType, handleSelect: (image: ImageType) => () => void, handleDeSelect: (image: ImageType) => () => void}) {
    const {file_name, title} = image
    const [clicked, setClicked] = useState<boolean>(false)
    const src = `${apiRoute}/static/images_gallery/${file_name}`
    console.log(src)
    const toggleSelect = handleSelect(image)
    const toggleDeSelect = handleDeSelect(image)
    const handleClick = () => {
      if (clicked){
        setClicked(false)
        toggleDeSelect()
      } else{
        setClicked(true)
        toggleSelect()
      }
    }
    return (
      <div className={`product-card ${clicked? "clicked": ""}`} onClick={handleClick} >
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