// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import pool from '@/lib/db/pool'

const handler = nc<NextApiRequest, NextApiResponse>()
    .get(async (req, res, next) =>{
        try{
            const {fileName} = req.query
            const images = await pool.query(
                'SELECT * FROM site.gallery_images WHERE file_name=$1',
                [fileName]
            )
            if (images.rows.length > 0){
                res.send({image: images.rows[0]})
            } else{
                res.status(404).send({image: null})
            }
        } catch (err){
            next(err)
        }
    })

export default handler