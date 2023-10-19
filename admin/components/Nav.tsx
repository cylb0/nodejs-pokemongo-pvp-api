import Image from 'next/image'
import Link from 'next/link'
import useUser from '@/hooks/useUser'
import Logout from './Logout'
import style from '@/styles/nav.module.css'

export default function Nav() {
    const [username] = useUser()
    return (
        <nav className={style.navbar}>
            <Link href="/">
                <Image 
                    src = "/images/logo.png"
                    width = {120}
                    height = {60}
                    alt = "Logo pokemon go"
                    priority = {true}
                />
            </Link>
            {
                !username && <Link href="/login">Login</Link>
            }
            {
                username && <Logout />
            }
        </nav>
    )
}