import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import style from "@/styles/login.module.css"

export default function Login() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
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
                var in1Hour:number = 1/24 
                Cookies.set('username', response.data.data.username, { expires: in1Hour })
                Cookies.set('token', response.data.token, { expires: in1Hour })
                router.push('/');
            } else {
                setError('Login failed')
                setPassword('')
                throw new Error('Login failed')
            }
        })
        .catch(error => {
            setError(error.response.data.message)
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
            {
                error && <p>{ error }</p>
            }
            <form 
                className={style.form}
                onSubmit={handleSubmit}>
                
                <h1>Login</h1>

                <div className={style.input}>
                    <label>Username</label>
                    <input 
                        type="text"
                        value={username}
                        onChange={handleUsernameChange} />
                </div>
                <div className={style.input}>
                    <label>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={handlePasswordChange} />
                </div>
                <button className={style.button} type="submit">Login</button>
            </form>
        </div>
    )
}