import React, {useState, useEffect} from 'react'
import { getUser } from '@/lib'
import Login from './Login'
import AdminNav from './AdminNav'
import { logout } from '@/lib'

const RouteGuard = ({children}: {children: JSX.Element}) => {
    const [auth, setAuth] = useState<string>("blank")
    const setAuthToTrue = () =>{
        setAuth("true")
    }
    useEffect(()=>{
        getUser()
            .then((value) => {
                if (value.user?.username){
                    setAuth("true")
                    
                } else{
                    setAuth("false")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <>
            {auth==="blank" && <div id="blank"/>}
            {auth==="true" && <AdminNav handleLogout={() => {logout().then(() => setAuth("false"))}}/>}
            {auth==="true" && children}
            {auth==="false" && <Login setAuth={setAuthToTrue}/>}
        </>
    )
}

export default RouteGuard