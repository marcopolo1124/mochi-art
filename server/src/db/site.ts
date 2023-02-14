import pool from './pool'
import { Response, Request, NextFunction } from 'express'
import { Pagination } from '../../types/custom'
import { RequestParams, ResponseBody,
        RequestBody, RequestQuery, AddImageBody, PaginationQuery} from "./interfaces";
import fs from 'fs'

export async function getState(req: Request, res: Response, next: NextFunction){
    const state = await pool.query(
        'SELECT commission_open, art_trade_open FROM site.state'
    )
    res.send(state.rows[0])
}

export async function toggleCommissionState(req: Request, res: Response){
    await pool.query(
        'UPDATE site.state \
         SET commission_open = NOT commission_open'
    )
    res.send({message: 'updated'})
}

export async function toggleArtTradeState(req: Request, res: Response){
    await pool.query(
        'UPDATE site.state \
         SET art_trade_open = NOT art_trade_open'
    )
    res.send({message: 'updated'})
}

export async function postImage(req: Request<RequestParams, ResponseBody, AddImageBody, RequestQuery>, res: Response, next: NextFunction){
    try{
        const fileName = req.fileName
        const {title, description, featured} = req.body
        console.log(req.body)
        const featuredBool = featured? true: false
        const datePosted = new Date()
        await pool.query(
            'INSERT INTO site.gallery_images (file_name, title, image_description, date_posted, featured)\
            VALUES ($1, $2, $3, $4, $5)',
            [fileName, title, description, datePosted, featuredBool]
        )
        res.status(201).send({message: 'image added'})
    } catch (e){
        console.log("Image upload unsuccessful")
        console.log(e)
        next()
    }
}

export async function getFeatured(req: Request, res: Response){
    const featured = await pool.query(
        'SELECT * FROM site.gallery_images WHERE featured=true ORDER BY title LIMIT 10',
    )
    res.send({images: featured.rows})
}

export async function getGallery(req: Request<RequestParams, ResponseBody, RequestBody, PaginationQuery>, res: Response){
    const {perPage, orderBy, page}: Pagination = req.query
    console.log(req.query)
    const rowCount = pool.query(
        'SELECT COUNT(*) FROM site.gallery_images'
    )
    const images = pool.query(
        'SELECT * FROM site.gallery_images ORDER BY $1 OFFSET $2 LIMIT $3',
        [orderBy, perPage * (page - 1), perPage]
    )

    res.send({
        images: (await images).rows,
        rowCount: (await rowCount).rows[0].count
    })
}

export async function deleteImage(req: Request, res: Response){
    const {fileName} = req.query
    console.log('delete')
    console.log(req.query)
    await pool.query(
        'DELETE FROM site.gallery_images WHERE file_name=$1',
        [fileName]
    )
    fs.unlink(`${process.env.GALLERY_PATH}/${fileName}`, (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('success')
    })
    res.status(204).send({message: 'deleted'})
}

export async function getImage(req:Request, res: Response){
    const {fileName} = req.params
    const images = await pool.query(
        'SELECT * FROM site.gallery_images WHERE file_name=$1',
        [fileName]
    )
    if (images.rows.length > 0){
        res.send({image: images.rows[0]})
    } else{
        res.status(404).send({image: null})
    }
    
}