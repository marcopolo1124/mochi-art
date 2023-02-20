// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import pool from '@/lib/db/pool'

const handler = nc<NextApiRequest, NextApiResponse>()
    .put(async (req, res, next) => {
        try{
            await pool.query(
                'UPDATE site.state \
                SET art_trade_open = NOT art_trade_open'
            )
            res.send({message: 'updated'})
        } catch(err){
            next(err)
        }
    })

export default handler