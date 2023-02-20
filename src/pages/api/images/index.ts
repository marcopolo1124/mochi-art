import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import nc from 'next-connect'
import db from '@/lib/db'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../../../../public/images_gallery")
    },
    filename: (req, file, cb) =>{
        const fileName = crypto.randomUUID() + path.extname(file.originalname)
        cb(null, fileName)
    }
})

const upload = multer({storage: storage})

const handler = nc()
    .get(db.getGallery)
    .post(upload.single('image'))
    .post(db.postImage)
    .delete(db.deleteImage)

export default handler