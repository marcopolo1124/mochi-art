import { AdminNav, RouteGuard } from '@/components'
import { getUser, logout } from '@/lib'
import React, {useState} from 'react'

const admin = ({user}: {user: string| null}) => {
    console.log(user)
    const startState = user? true: false
    const [auth, setAuth] = useState<boolean>(startState)
    const setAuthToTrue = () => {
        setAuth(true)
    }
    const setAuthToFalse = () =>{
        setAuth(false)
    }
    return (
        <RouteGuard auth={auth} setAuth={setAuthToTrue}>
            <AdminNav handleLogout={() => {logout(); setAuthToFalse()}}/>
        </RouteGuard>
    )
}

export default admin

export async function getServerSideProps(){
    const user = await getUser()
    console.log(user)
    if (user.user){
        return {props: {user: user.user.username}}
    } else{
        return {props: {user: null}}
    }
}