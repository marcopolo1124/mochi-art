// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import db from '@/lib/db'

const handler = nc()
    .put(db.getCommission)

export default handler