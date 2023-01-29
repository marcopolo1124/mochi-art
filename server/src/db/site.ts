import pool from './pool'
import { Response, Request, NextFunction } from 'express'
import { Pagination } from '../../types/custom'

export async function getState(req: Request, res: Response, next: NextFunction){
    const state = await pool.query(
        'SELECT commission_open FROM site.state'
    )
    req.state = state.rows[0]
    next()
}

export async function toggleState(req: Request, res: Response){
    await pool.query(
        'UPDATE site.state \
         SET commission_open = NOT commission_open'
    )
    res.send({message: 'updated'})
}

export async function postImage(req: Request, res: Response){
    const {fileName, title, description} = req.body
    const datePosted = new Date()
    await pool.query(
        'INSERT INTO site.gallery_images (file_name, title, description, date_posted)\
         VALUES ($1, $2, $3, $4)',
        [fileName, title, description, datePosted]
    )
    res.status(201).send({message: 'image added'})
}

export async function getGallery(req: Request, res: Response){
    const {perPage, orderBy, page}: Pagination = req.body
    const rowCount = pool.query(
        'SELECT COUNT(*) FROM site.gallery_images'
    )
    const images = pool.query(
        'SELECT * FROM site.gallery_images ORDER BY $1 OFFSET $2 LIMIT $3',
        [orderBy, perPage * (page - 1), perPage]
    )

    res.send({
        images: await images,
        rowCount: await rowCount
    })
}