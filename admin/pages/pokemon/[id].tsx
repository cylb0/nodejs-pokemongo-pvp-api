import Pokemon from "@/components/Pokemon"
import { GetServerSideProps } from "next";
import { useRouter } from "next/router"

import axios from 'axios'

interface PokemonData {
    pokemon_id: number
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    const username = req.cookies.username;

    if (!username) {
        res.writeHead(302, { Location: "/login" });
        res.end();
    }

    const { id } = query
    const pokemon_id = typeof id === "string" ? parseInt(id) : null

    let previousId: number | null = null
    let nextId: number | null = null
    
    return axios
        .get('http://localhost:3001/api/pokemon_names.json')
        .then(response => {
            if (response.status === 200) {
                const pokemons = response.data

                if (pokemon_id !== null) {
                    const currentIndex = pokemons.findIndex((pokemon: PokemonData) => pokemon.pokemon_id === pokemon_id)

                    if (currentIndex !== -1) {
                        if (currentIndex > 0) {
                            previousId = pokemons[currentIndex-1].pokemon_id
                        }
                        if (currentIndex < pokemons.length - 1) {
                            nextId = pokemons[currentIndex + 1].pokemon_id
                        }
                    }
                }
            }
            return Promise.resolve({
                props: { previousId, nextId }
            })
        })
        .catch(error => {
            console.error(error)
            return Promise.resolve({
                props: { previousId, nextId }
            })
        })
}

export default function PokemonPage({previousId, nextId}: {previousId: number | null, nextId: number | null}) {
    const router = useRouter()
    const { id } = router.query
    const pokemon_id = typeof id === "string" ? parseInt(id) : null

    return (
        <>
            {
                pokemon_id !== null && 
                <Pokemon pokemon_id={pokemon_id} previousId={previousId} nextId={nextId}/>
            }
        </>
    )
}