// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import pool from '@/lib/db/pool'

const handler = nc<NextApiRequest, NextApiResponse>()
    .patch(async (req, res, next) =>{
        try{
            const {commission_id, status} = req.body
            if (!commission_id || ! status) {
                const err = new Error ("missing information")
                next(err)
            }
            const updateReq = await pool.query(
                "UPDATE commissions.commissions SET commission_status=$2 WHERE id=$1",
                [commission_id, status]
            )
            res.send({message: "updated"})
        } catch(err){
            next(err)
        }
    })

export default handler