// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import pool from '@/lib/db/pool'

const handler = nc<NextApiRequest, NextApiResponse>()
    .put(async (req, res, next) => {
        try{
            await pool.query(
                'UPDATE site.state \
                SET commission_open = NOT commission_open'
            )
            res.send({message: 'updated'})
        } catch(err){
            next(err)
        }
    })

export default handler