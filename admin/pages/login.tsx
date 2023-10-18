import Login from "@/components/Login"
import Nav from "@/components/Nav"
import useUser from "@/hooks/useUser"
import { useRouter } from "next/router"

export default function LoginPage() {
    const router = useRouter()
    const [username] = useUser()
    console.log('LOGIN_USEUSER',username)
    if (username) {
        router.push('/')
    }
    return (
        <>
            <Nav />
            <Login />
        </>
    )
}