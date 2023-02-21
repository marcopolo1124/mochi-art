import React, {useState} from 'react'
import { loginUser } from '@/lib'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/router'
import {redirect} from 'next/navigation'

const Login = () => {
    const router = useRouter()
    const query = router.query
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (event: React.FormEvent) => {
        let callback = query.callbackUrl
        if (typeof(callback) !== 'string' || !callback){
            callback = "/admin/state"
        }
        event.preventDefault()
        signIn('credentials', {
            username: username,
            password: password,
            callbackUrl: callback
        })
    }
    return (
        <div className='layout'>
        <form id="login-form" onSubmit={handleSubmit}>
            <h2>Admin Login</h2>
            <label htmlFor='username'>Username:</label>
            <input
                name='username'
                id='username'
                type={"text"}
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
                required
            />
            <label htmlFor='password'>Password:</label>
            <input
                name='password'
                id='password'
                type={"password"}
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                required
            />
            <input type={"submit"} value="LOGIN"/>
        </form>
        </div>
    )
}

export default Login