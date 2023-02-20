import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import nc from 'next-connect'
import pool from '@/lib/db/pool'
import { NextApiRequest, NextApiResponse } from 'next'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../../../../public/commission_gallery")
    },
    filename: (req, file, cb) =>{
        const fileName = crypto.randomUUID() + path.extname(file.originalname)
        cb(null, fileName)
    }
})

const upload = multer({storage: storage})

const multipleUpload = upload.fields([{name: 'references'}])

interface FileRequest extends NextApiRequest {
    files: { [references: string]: Express.Multer.File[] };
}


const handler = nc<NextApiRequest, NextApiResponse>()
    .get(async (req, res, next) => {
        const {status, perPage, orderBy, page} = req.query
        if (typeof(perPage) !== 'string' || typeof(page) !=='string'){
            return next(new Error("Bad request"))
        }
        const perPageInt = parseInt(perPage)
        const pageInt = parseInt(page)
        const query = `SELECT * FROM commissions.commissions ${status? "WHERE commission_status=$4": ""} ORDER BY $1 OFFSET $2 LIMIT $3`
        const bindVarBase = [orderBy, perPageInt * (pageInt - 1), perPageInt]
        const bindVar = status? [...bindVarBase, status]: bindVarBase
        try{
            const rowCount = pool.query(
                'SELECT COUNT(*) FROM commissions.commissions'
            )
            const commissions = await pool.query(
                query,
                bindVar
            )
            //
            res.send({commissions: commissions.rows, rowCount: (await rowCount).rows[0].count})
        }catch (err){
            next(err)
        }
    })
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
            images.references?.forEach((reference) => {
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