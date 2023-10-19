import Pokemon from "@/components/Pokemon"
import Nav from "@/components/Nav"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import style from "@/styles/pokemonpage.module.css"

export default function PokemonPage() {
    const router = useRouter()
    const { id } = router.query
    const pokemon_id = typeof id === "string" ? parseInt(id) : null

    return (
        <div>
            <Nav />
            {
                pokemon_id !== null && 
                <Pokemon pokemon_id={pokemon_id}/>
            }
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const username = req.cookies.username

    if (!username) {
        res.writeHead(302, { Location: "/login" })
        res.end()
    }

    return {
        props: {}
    }
}