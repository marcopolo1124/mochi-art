import db from '../db'
import express from 'express'

const site_state = express.Router()

site_state.get('/', db.getState)

site_state.put('/', db.toggleState)

export default site_state