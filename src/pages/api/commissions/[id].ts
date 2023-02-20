// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import pool from '@/lib/db/pool'

const handler = nc<NextApiRequest, NextApiResponse>()
    .put(async(req, res, next) => {
        const {status, perPage, orderBy, page} = req.query
        const query = `SELECT * FROM commissions.commissions ${status? "WHERE commission_status=$4": ""} ORDER BY $1 OFFSET $2 LIMIT $3`
        if (typeof(perPage) !== 'string' || typeof(page) !=='string'){
            return next(new Error("Bad request"))
        }
        const perPageInt = parseInt(perPage)
        const pageInt = parseInt(page)

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
        }})

export default handler