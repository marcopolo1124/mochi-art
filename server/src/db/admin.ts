import pool from "./pool";
import bcrypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express'

export async function getAdminByUsername(req: Request, res: Response, next: NextFunction) {
    const {username} = req.body
    const adminUser = await pool.query(
        'SELECT * FROM users.admin WHERE username=$1'
        , [username]
    )

    if (adminUser.rows.length > 0){
        req.admin = adminUser.rows[0]
        next()
    } else{
        res.status(404).send({message: 'user not found'})
    }
}

export async function postAdmin(req: Request, res: Response){
    const {username, password} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hash(password, salt)
    await pool.query(
        'INSERT INTO users.admin (username, password)\
         VALUES ($1, $2)'
        , [username, hashedPassword]
    )
    res.status(201).send({message: 'user successfully created'})
}

export async function updateAdminPassword(req: Request, res: Response){
    const {username, password} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hash(password, salt)
    await pool.query(
        'UPDATE users.admin SET password = $2 WHERE username = $1',
        [username, hashedPassword]
    )
    res.status(200).send({message: 'password updated'})
}

export async function deleteAdmin(req: Request, res: Response){
    const {username} = req.body
    await pool.query(
        'DELETE FROM users.admin WHERE username = $1',
        [username]
    )
    res.status(204)
}