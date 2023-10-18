import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function Logout() {

    const router = useRouter()

    const handleClick = () => {
        Cookies.remove('username')
        Cookies.remove('token')
        router.push('/login')
    }

    return (
        <button onClick={handleClick}>Logout</button>
    )
}