import pool from './pool'
import { Response, Request, NextFunction } from 'express'
import { Pagination } from '../../types/custom'
import { RequestParams, ResponseBody,
        RequestBody, RequestQuery, AddImageBody, PaginationQuery} from "./interfaces";

export async function getState(req: Request, res: Response, next: NextFunction){
    const state = await pool.query(
        'SELECT commission_open FROM site.state'
    )
    res.send(state.rows[0])
}

export async function toggleState(req: Request, res: Response){
    await pool.query(
        'UPDATE site.state \
         SET commission_open = NOT commission_open'
    )
    res.send({message: 'updated'})
}

export async function postImage(req: Request<RequestParams, ResponseBody, AddImageBody, RequestQuery>, res: Response){
    const fileName = req.fileName
    const {title, description} = req.body
    const datePosted = new Date()
    await pool.query(
        'INSERT INTO site.gallery_images (file_name, title, image_description, date_posted)\
         VALUES ($1, $2, $3, $4)',
        [fileName, title, description, datePosted]
    )
    res.status(201).send({message: 'image added'})
}

export async function getGallery(req: Request<RequestParams, ResponseBody, RequestBody, PaginationQuery>, res: Response){
    const {perPage, orderBy, page}: Pagination = req.query
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
    const {fileName} = req.body
    await pool.query(
        'DELETE FROM site.gallery_images WHERE file_name=$1',
        [fileName]
    )
    res.status(204).send({message: 'deleted'})
}