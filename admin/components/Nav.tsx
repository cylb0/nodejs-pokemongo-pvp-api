import Image from 'next/image'
import Link from 'next/link'
import useUser from '@/hooks/useUser'

export default function Nav() {
    const [username] = useUser()
    return (
        <nav>
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
        </nav>
    )
}