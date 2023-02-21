import React, {useState, useEffect} from 'react'
import { getUser } from '@/lib'
import Login from './Login'
import AdminNav from './AdminNav'
import { logout } from '@/lib'
import {useSession, signIn} from 'next-auth/react'


const RouteGuard = ({children}: {children: JSX.Element}) => {
    const session = useSession()
    return (
        <>
            {session.status==="loading" && <div id="blank"/>}
            {session.status==="authenticated" && <AdminNav/>}
            {session.status==="authenticated" && children}
            {session.status==="unauthenticated" && signIn()}
        </>
    )
}

export default RouteGuard