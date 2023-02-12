import React from 'react'
import Login from './Login'

const RouteGuard = ({children, auth, setAuth}: {children: JSX.Element, auth: boolean, setAuth: any}) => {
    return (
        <>
            {auth? children: <Login setAuth={setAuth}/>}
        </>
    )
}

export default RouteGuard