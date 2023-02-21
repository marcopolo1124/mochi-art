import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import pool from '@/lib/db/pool'

const ImageGallery = './images_gallery'

interface FileNameReq extends NextApiRequest {
    fileName: string;
} 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, ImageGallery)
    },
    filename: (req: any, file, cb) =>{
        const fileName = crypto.randomUUID() + path.extname(file.originalname)
        req.fileName = fileName
        console.log(fileName)
        cb(null, fileName)
    }
})

const upload = multer({storage: storage})

const handler = nc<NextApiRequest, NextApiResponse>()
    .get(async (req, res, next) => {
        try{
            const {perPage, orderBy, page} = req.query
            const rowCount = pool.query(
                'SELECT COUNT(*) FROM site.gallery_images'
            )
            if (typeof(perPage) !== 'string' || typeof(page) !=='string'){
                return next(new Error("Bad request"))
            }
            const perPageInt = parseInt(perPage)
            const pageInt = parseInt(page)
            const images = pool.query(
                'SELECT * FROM site.gallery_images ORDER BY $1 OFFSET $2 LIMIT $3',
                [orderBy, perPageInt * (pageInt - 1), perPageInt]
            )
    
            res.send({
                images: (await images).rows,
                rowCount: (await rowCount).rows[0].count
            })
        } catch (err){
            next(err)
        }
    })
    .post(upload.single('image'))
    .post<FileNameReq, NextApiResponse>(async (req, res, next) => {
        try{
            const fileName = req.fileName
            const {title, description, featured} = req.body
            const featuredBool = featured? true: false
            const datePosted = new Date()
            await pool.query(
                'INSERT INTO site.gallery_images (file_name, title, image_description, date_posted, featured)\
                VALUES ($1, $2, $3, $4, $5)',
                [fileName, title, description, datePosted, featuredBool]
            )
            res.status(201).send({message: 'image added'})
        } catch (e){
    
            next(e)
        }
    })
    .delete(async (req, res, next) => {
        try{
            const {fileName} = req.query
            await pool.query(
                'DELETE FROM site.gallery_images WHERE file_name=$1',
                [fileName]
            )
            fs.unlink(`${ImageGallery}/${fileName}`, (err) => {
                if (err) {
                    return
                }
            })
            res.status(204).send({message: 'deleted'})
        } catch (err){
            next(err)
        }
    })

export default handler

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };