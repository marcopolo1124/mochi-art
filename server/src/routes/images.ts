import db from '../db'
import express from 'express'
import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.GALLERY_PATH?process.env.GALLERY_PATH: "../gallery_images")
    },
    filename: (req, file, cb) =>{
        const fileName = Date.now() + path.extname(file.originalname)
        console.log(file)
        cb(null, fileName)
        req.fileName=fileName
    }
})

const upload = multer({storage: storage})

const images = express.Router()

images.get('/', db.getGallery)

images.post('/upload', upload.single('image'), db.postImage)

images.delete('/delete', db.deleteImage)

export default images