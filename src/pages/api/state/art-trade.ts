// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import db from '@/lib/db'
type Data = {
  message: string
}
const handler = nc()
    .put(db.toggleArtTradeState)

export default handler