// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import pool from '@/lib/db/pool'

const handler = nc<NextApiRequest, NextApiResponse>()
    .get(async (req, res, next) => {
        try{
            const state = await pool.query(
                'SELECT commission_open, art_trade_open FROM site.state'
            )
            res.send(state.rows[0])
        } catch(err) {
            next(err)
        }
    })

export default handler