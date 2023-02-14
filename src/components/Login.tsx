import React, {useState} from 'react'
import { loginUser } from '@/lib'

const Login = ({setAuth}: {setAuth: any}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const status = await loginUser({username, password})
        if (status === 400){
            return
        }
        setAuth()
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
                onChange={(e) => {setUsername(e.target.value)}}
                required
            />
            <label htmlFor='password'>Password:</label>
            <input
                name='password'
                id='password'
                type={"password"}
                onChange={(e) => {setPassword(e.target.value)}}
                required
            />
            <input type={"submit"} value="LOGIN"/>
        </form>
        </div>
    )
}

export default Login