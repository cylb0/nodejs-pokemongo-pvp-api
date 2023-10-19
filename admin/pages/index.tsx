import Dashboard from "@/components/Dashboard"
import useUser from "@/hooks/useUser"
import style from "@/styles/index.module.css"

export default function Home() {
    const [username] = useUser()
    return (
        <>
            {
              username ? (
                <>
                  <h2 className={style.hello}>Hello {username}</h2>
                  <Dashboard />
                </>
              ) : (
                <p>Please log in</p>
              )
            }
        </>
    )
}
