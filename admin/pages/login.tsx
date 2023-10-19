import Login from "@/components/Login"
import style from "@/styles/login.module.css"
import useUser from "@/hooks/useUser"
import { useRouter } from "next/router"

export default function LoginPage() {
    const router = useRouter()
    const [username] = useUser()
    if (username) {
        router.push('/')
    }
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh"
        }}>
            <Login />
        </div>
    )
}