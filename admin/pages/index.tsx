import Dashboard from "@/components/Dashboard"
import Nav from "@/components/Nav"
import useUser from "@/hooks/useUser"

export default function Home() {
    const [username] = useUser()
    return (
        <>
            <Nav />
            {
              username ? (
                <Dashboard />
              ) : (
                <p>Please log in</p>
              )
            }
        </>
    )
}
