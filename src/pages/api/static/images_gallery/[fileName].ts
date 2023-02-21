// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import fs from 'fs'

const handler = nc<NextApiRequest, NextApiResponse>()
    .get(async (req, res, next) => {
        const fileName = req.query.fileName
        const filePath = `./static/images_gallery/${fileName}`
        const imageBuffer = fs.readFileSync(filePath)
        res.setHeader("Content-Type", "image/jpg")
        return res.send(imageBuffer)
    })

export default handler