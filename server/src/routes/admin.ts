import db from '../db'
import initialize from './passport-config'
import passport from 'passport'
import express from 'express'
import session from 'express-session'

initialize(passport)
const admin = express.Router()
const secret = process.env.SESSION_SECRET
admin.use(session({
    secret: secret?secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))
admin.use(passport.initialize())
admin.use(passport.session())

admin.get('/', (req, res)=> {
    res.send({user: req.user, message:'test'})
})

admin.post(
    '/login',
    (req, res, next) => {
        passport.authenticate(
            'local', (err, user) => {
                console.log(user)
                if (err) res.status(500).send({message: 'Server error'})
                if (!user) res.status(404).send({message: 'User not found'})
                else {
                    req.login(user, err => {
                        if (err) res.status(500).send({message: 'Server error', error: JSON.stringify(err)})
                        res.send({message: 'Successfully Authenticated'})
                    })
                }
            }
        )(req, res, next)
    }
)

export default admin