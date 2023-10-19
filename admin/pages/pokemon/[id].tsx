import Pokemon from "@/components/Pokemon"
import Nav from "@/components/Nav"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

export default function PokemonPage() {
    const router = useRouter()
    const { id } = router.query
    const pokemon_id = typeof id === "string" ? parseInt(id) : null

    return (
        <div>
            {
                pokemon_id !== null && 
                <Pokemon pokemon_id={pokemon_id}/>
            }
        </div>
    )
}