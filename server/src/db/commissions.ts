import { Request, Response } from "express";
import pool from "./pool";
import crypto from "crypto"

export async function getCommissionsWithStatus(req: Request<RequestParams, ResponseBody, RequestBody, StatusQuery>, res: Response){
    
    let commissions;
    if (req.query.status){
        commissions = await pool.query(
            "SELECT * FROM commissions.commissions WHERE status=$1",
            [req.query.status]
        )
    } else {
        commissions = await pool.query(
            "SELECT * FROM commissions.commissions"
        )
    }

    res.send({pendingCommissions: commissions.rows})
}

export async function getCommission(req: Request<RequestParams, ResponseBody, RequestBody, IdQuery>, res: Response){
    const {id} = req.query

    const images = pool.query(
        'SELECT * FROM commissions.commission_images WHERE commission_id=$1',
        [id]
    )

    const commission = await pool.query(
        'SELECT * FROM commissions.commission WHERE id=$1',
        [id]
    )

    if (commission.rows.length > 0){
        res.send({
            commission,
            images: (await images).rows
        })
    } else{
        res.status(404).send({
            commission: null,
            images: []
        })
    }
}

export async function postCommission(req: Request<RequestParams, ResponseBody, CommissionBody, RequestQuery>, res: Response) {
    const {email, commission_detail, images} = req.body
    const id = crypto.randomUUID()
    const timestamp = new Date()
    const status: Status = 'pending'
    await pool.query(
        "INSERT INTO commissions.commissions (id, email, commission_detail, date_of_purchase, commission_status)\
         VALUES ($1, $2, $3, $4, $5)",
        [id, email, commission_detail, timestamp, status]
    )
    const promises = []
    for (const file_name in images) {
        promises.push(pool.query(
            "INSERT INTO commissions.commission_images (commission_id, file_name)\
             VALUES ($1, $2)",
            [id, file_name]
        ))
    }
    await Promise.all(promises)
    res.status(201).send({message: 'commission pending'})
}

type Status = 'pending' | 'completed' | 'rejected' | 'accepted'
interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {}

interface StatusQuery {
  status?: Status;
}

interface IdQuery {
    id: string;
}

interface CommissionBody {
    email: string;
    commission_detail: string;
    images: [string]
}
