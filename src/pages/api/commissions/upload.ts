import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import nc from 'next-connect'
import pool from '@/lib/db/pool'
import { NextApiRequest, NextApiResponse } from 'next'
const commissionsPath = './static/commission_gallery'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, commissionsPath)
    },
    filename: (req, file, cb) =>{
        const fileName = crypto.randomUUID() + path.extname(file.originalname)
        console.log(fileName)
        cb(null, fileName)
    }
})

const upload = multer({storage: storage})

const multipleUpload = upload.array("references")

interface FileRequest extends NextApiRequest {
    files:  Express.Multer.File[] ;
}


const handler = nc<NextApiRequest, NextApiResponse>()
    .post(multipleUpload)
    .post<FileRequest, NextApiResponse>(async (req, res, next) => {
        const images = req.files
        try{
            const {name, email, characterName, numberOfCharacters, scope, comType, details} = req.body
            const id = crypto.randomUUID()
            await pool.query(
                "INSERT INTO commissions.commissions (id, name, email, character_name, number_of_characters, scope, com_type, details)\
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                [id, name, email, characterName, numberOfCharacters, scope, comType, details]
            )
            // const promises = []
            console.log("files", req.files)
            images.forEach((reference) => {
                pool.query(
                    "INSERT INTO commissions.commission_images (commission_id, file_name)\
                     VALUES ($1, $2)",
                    [id, reference.filename]
                )
            })
            // await Promise.all(promises)
            res.status(201).send({message: 'commission pending'})
        }catch (err){
            next(err)
        }
    })

export default handler

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };