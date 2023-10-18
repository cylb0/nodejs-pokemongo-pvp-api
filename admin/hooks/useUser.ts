import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export default function useUser() {
    const [username, setUsername] = useState<string>()
    useEffect(() => {
        setUsername(Cookies.get('username'))
    }, [])

    return [username]
}