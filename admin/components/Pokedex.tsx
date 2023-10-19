import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import style from '@/styles/pokedex.module.css'
import Image from 'next/image'
import Link from 'next/link'

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
    const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<Pokemon | null>(null)
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

    const handleDeleteClick = (pokemon: Pokemon) => {
        setDeleteConfirmTarget(pokemon)
    }

    const confirmDelete = async () => {
        const id = deleteConfirmTarget?.pokemon_id
        axios
            .delete(`http://localhost:3001/api/pokemon/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setMessage(response.data.message)
                setDeleted(true)
                setDeleteConfirmTarget(null)
            })
            .catch(error => {
                setError(error.message)
            })
    }

    const cancelDelete = () => {
        setDeleteConfirmTarget(null)
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
                                    <Link href={`/pokemon/${pokemon.pokemon_id}`}>
                                        <Image 
                                            className={style.icon}
                                            src={'/icons/edit.png'}
                                            width={24}
                                            height={24}
                                            alt='Icon edit'/>
                                    </Link>
                                    
                                </td>
                                <td>
                                    <Image 
                                            className={style.icon}
                                            src={'/icons/delete.png'}
                                            width={24}
                                            height={24}
                                            alt='Icon delete'
                                            onClick={() => handleDeleteClick(pokemon)}
                                            style={{cursor: 'pointer' }}/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                deleteConfirmTarget !== null && (
                    <dialog open className={style.dialog}>
                        <div>
                            <h2>Are you sure you wan't to delete #{deleteConfirmTarget.pokemon_id} {deleteConfirmTarget.pokemon_name} ?</h2>
                            <form method="dialog">
                                <button onClick={confirmDelete}>Delete</button>
                                <button onClick={cancelDelete}>Cancel</button>
                            </form>
                        </div>
                    </dialog>
                ) 
            }
        </>
    )
}