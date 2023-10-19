import Dashboard from "@/components/Dashboard"
import Nav from "@/components/Nav"
import useUser from "@/hooks/useUser"
import Layout from "@/components/Layout"

export default function Home() {
    const [username] = useUser()
    return (
        <>
            {
              username ? (
                <>
                  <h2>Hello {username}</h2>
                  <Dashboard />
                </>
              ) : (
                <p>Please log in</p>
              )
            }
        </>
    )
}
