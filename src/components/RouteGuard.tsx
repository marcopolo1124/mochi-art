import React, {useState, useEffect} from 'react'
import { getUser } from '@/lib'
import Login from './Login'
import AdminNav from './AdminNav'
import { logout } from '@/lib'

const RouteGuard = ({children}: {children: JSX.Element}) => {
    const [auth, setAuth] = useState<boolean>(false)
    const setAuthToTrue = () =>{
        setAuth(true)
    }
    useEffect(()=>{
        getUser()
            .then((value) => {
                if (value.user?.username){
                    setAuth(true)
                }
            })
    }, [auth])

    
    return (
        <>
            {auth && <AdminNav handleLogout={() => {logout().then(() => setAuth(false))}}/>}
            {auth? children: <Login setAuth={setAuthToTrue}/>}
        </>
    )
}

export default RouteGuard