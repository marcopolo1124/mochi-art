import React, {useState} from 'react'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <form id="login-form" action="">
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
    )
}

export default Login