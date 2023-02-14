import React, {useState, useEffect} from 'react'
import { getUser } from '@/lib'
import Login from './Login'
import AdminNav from './AdminNav'
import { logout } from '@/lib'

const RouteGuard = ({init, children}: {init: boolean, children: JSX.Element}) => {
    const [auth, setAuth] = useState<boolean>(init)
    const setAuthToTrue = () =>{
        setAuth(true)
    }
    useEffect(()=>{
        console.log(auth)
        getUser()
            .then((value) => {
                console.log("GETUSER")
                console.log(value)
                if (value.user?.username){
                    console.log(value.user?.username)
                    setAuth(true)
                }
            })
    }, [auth])

    
    return (
        <>
            <AdminNav handleLogout={() => {logout().then(() => setAuth(false))}}/>
            {auth? children: <Login setAuth={setAuthToTrue}/>}
        </>
    )
}

export default RouteGuard