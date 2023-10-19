import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import style from '@/styles/pokedex.module.css'
import Image from 'next/image'

interface Pokemon {
    pokemon_id: number,
    pokemon_name: string,
    pokemon_name_fr: string
}

export default function Pokedex() {
    const [pokemons, setPokemons] = useState<Pokemon[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [deleted, setDeleted] = useState<boolean>(false)
    const token: string = Cookies.get('token') || ''

    useEffect(() => {
        axios
            .get('http://localhost:3001/api/pokemon', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setPokemons(response.data.data)
            })
            .catch(error => {
                setError(error.message)
            })
    }, [deleted])

    const handleDeleteClick = async (id: number) => {
        axios
            .delete(`http://localhost:3001/api/pokemon/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setMessage(response.data.message)
                setDeleted(true)
            })
            .catch(error => {
                setError(error.message)
            })
    }

    return (
        <>
            {
                error && <p>{error}</p>
            }
            {
                deleted && <p>{message}</p>
            }
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>English name</th>
                        <th>Nom français</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pokemons && pokemons.map((pokemon) => (
                            <tr key={pokemon.pokemon_id}>
                                <td>#{String(pokemon.pokemon_id).padStart(3, '0')}</td>
                                <td>{pokemon.pokemon_name}</td>
                                <td>{pokemon.pokemon_name_fr}</td>
                                <td>
                                    <Image 
                                        src={'/icons/edit.png'}
                                        width={24}
                                        height={24}
                                        alt='Icon edit'/>
                                </td>
                                <td>
                                    <Image 
                                            className={style.icon}
                                            src={'/icons/delete.png'}
                                            width={24}
                                            height={24}
                                            alt='Icon delete'
                                            onClick={() => handleDeleteClick(pokemon.pokemon_id)}
                                            style={{cursor: 'pointer' }}/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}