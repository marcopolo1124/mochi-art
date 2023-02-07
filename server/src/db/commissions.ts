import { Request, Response } from "express";
import pool from "./pool";
import crypto from "crypto"
import { RequestParams, ResponseBody,
         RequestBody, StatusQuery, IdQuery,
         CommissionBody, RequestQuery } from "./interfaces";

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
    const images = req.files as { [references: string]: Express.Multer.File[] };
    console.log(images)
    console.log(req.body)
    const {name, email, characterName, numberOfCharacters, scope, comType, details} = req.body
    const id = crypto.randomUUID()
    await pool.query(
        "INSERT INTO commissions.commissions (id, name, email, character_name, number_of_characters, scope, com_type, details)\
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [id, name, email, characterName, numberOfCharacters, scope, comType, details]
    )
    // const promises = []
    images.references.forEach((reference) => {
        pool.query(
            "INSERT INTO commissions.commission_images (commission_id, file_name)\
             VALUES ($1, $2)",
            [id, reference.filename]
        )
    })
    // await Promise.all(promises)
    res.status(201).send({message: 'commission pending'})
}
