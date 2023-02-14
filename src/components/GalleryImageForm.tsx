import React, {useState, useEffect} from 'react'
import { uploadImage } from '@/lib'
function GalleryImageForm (){
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [image, setImage] = useState<File[]>([])

    return (
        <form className='admin-section' onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('image', image[0])
            uploadImage(formData)
            setTitle("")
            setDescription("")
            setImage([])
        }}>
            <h2>Upload image to Gallery</h2>
            <label htmlFor='title'>Title:</label>
            <input
                name='title'
                id='title'
                type={"text"}
                value={title}
                onChange={(e) => {setTitle(e.target.value)}}
                required
            />
            <label htmlFor='description'>Description:</label>
            <textarea name='description' onChange={(e) => {setDescription(e.target.value)}} value={description}/>

            <div className='file-upload'>
                <label htmlFor='image' className='upload-label'>Upload image</label>
                <input type="file" id="image" name="image" onChange={(e) => {setImage(e.target.files?[e.target.files[0]]: [])}} required/>
                <p>{image?.[0]?.name}</p>
            </div>

            <input type="submit" value="UPLOAD"/>


        </form>
    )
}

export default GalleryImageForm