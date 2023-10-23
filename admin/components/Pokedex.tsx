import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import style from '@/styles/pokedex.module.css'
import Image from 'next/image'
import Link from 'next/link'
import AddPokemonForm from './AddPokemonForm'
import Pokemon from '@/interfaces/Pokemon'

export default function Pokedex() {
    const [pokemons, setPokemons] = useState<Pokemon[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
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
    }, [showConfirmation])

    const handleDeleteClick = (pokemon: Pokemon) => {
        setError(null)
        setMessage(null)
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
                setShowConfirmation(true)
                setDeleteConfirmTarget(null)
            })
            .catch(error => {
                setError(error.response.data.message)
            })
    }

    const cancelDelete = () => {
        setDeleteConfirmTarget(null)
    }

    const handleAddClick = (newPokemon: Pokemon) => {
        setError(null)
        setMessage(null)
        axios
            .post('http://localhost:3001/api/pokemon', newPokemon, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setMessage(response.data.message)
                setShowConfirmation(true)
            })
            .catch(error => {
                setError(error.response.data.message)
            })
    }

    return (
        <div className={style.container}>
            {
                error && <p className={style.error}>{error}</p>
            }
            {
                message && <p className={style.message}>{message}</p>
            }

            <table className={style.table}>
                <thead className={style.thead}>
                    <tr>
                        <th>#</th>
                        <th>English name</th>
                        <th>Nom français</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <AddPokemonForm onAddClick = {handleAddClick} />
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
                                <button className={style.button} onClick={confirmDelete}>Delete</button>
                                <button className={style.button} onClick={cancelDelete}>Cancel</button>
                            </form>
                        </div>
                    </dialog>
                ) 
            }

            {
                showConfirmation && (
                    <dialog open className={style.dialog}>
                        <div>
                            <h2>{message}</h2>
                            <form method="dialog">
                                <button 
                                    className={style.button} 
                                    onClick={(e) => {
                                        setShowConfirmation(false)
                                    }}>OK</button>
                            </form>
                        </div>
                    </dialog>
                )
            }
        </div>
    )
}