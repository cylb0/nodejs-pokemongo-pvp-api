import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const router = useRouter()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        axios.post('http://localhost:3001/api/login', {username, password}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                Cookies.set('username', response.data.data.username)
                Cookies.set('token', response.data.token)
                router.push('/');
            } else {
                setError(response.data.message)
                setPassword('')
                throw new Error('Login failed')
            }
        })
        .catch(error => {
            setError(error.message)
        })
    }

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <div>
            <h1>Login</h1>
            {
                error && <p>{ error }</p>
            }
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input 
                        type="text"
                        value={username}
                        onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={handlePasswordChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}