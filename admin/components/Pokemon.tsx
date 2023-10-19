import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Variant from './Variant'
import Form from '@/interfaces/Form'
import style from '@/styles/pokemon.module.css'
import { useRouter } from 'next/router'

interface Props {
    pokemon_id: number | null
}

interface Pokemon {
    pokemon_id: number,
    pokemon_name: string,
    pokemon_name_fr: string,
    created: string
}

export default function Pokemon(props: Props) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [editedPokemon, setEditedPokemon] = useState({})
    const [forms, setForms] = useState<Form[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [showModal, setShowModal] = useState<string>('')
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
    const router = useRouter()
    const token = Cookies.get('token')

    // Fetch pokemon data
    useEffect(() => {
        axios.get(`http://localhost:3001/api/pokemon/${props.pokemon_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setPokemon(response.data.data)
                } else {
                    setError('Failed to get resources.')
                }
            })
            .catch(error => {
                setError(error.response.data.message)
            })
    }, [props.pokemon_id, token])

    // Fetch forms as soon as pokemon is retrieved
    useEffect(() => {
        if (pokemon !== null) {
            axios
                .get(`http://localhost:3001/api/form?id=${pokemon.pokemon_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    setForms(response.data.data)
                })
                .catch(error => {
                    setError(error.response.data.message)
                })
        }
    }, [pokemon, token])

    // Update pokemon   
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        axios
            .put(`http://localhost:3001/api/pokemon/${pokemon.pokemon_id}`, editedPokemon, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    setShowModal(response.data.message)               
                } else {
                    setError('Failed to update pokemon.')
                }
            })
            .catch(error => {
                setError(error.response.data.message)
            })
    }

    const handleDeleteClick = () => {
        setDeleteConfirm(true)
    }

    const confirmDelete = async () => {
        axios
            .delete(`http://localhost:3001/api/pokemon/${pokemon.pokemon_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                router.push('/')
            })
            .catch(error => {
                setError(error.message)
            })
    }

    const cancelDelete = () => {
        setDeleteConfirm(false)
    }

    return (
        <>
            {
                error && <p>{error}</p>
            }
            {
                pokemon !== null && (
                    <>
                        <h2>#{pokemon.pokemon_id} {pokemon.pokemon_name}</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Name</label>
                                <input
                                    placeholder={pokemon.pokemon_name} 
                                    type="text" 
                                    onChange={(e) => setEditedPokemon({...editedPokemon, pokemon_name: e.target.value})} />
                            </div>
                            <div>
                                <label>French name</label>
                                <input
                                    placeholder={pokemon.pokemon_name_fr} 
                                    type="text"
                                    onChange={(e) => setEditedPokemon({...editedPokemon, pokemon_name_fr: e.target.value})} />
                            </div>
                            <button type="submit">Save changes</button>
                        </form>
                        <button 
                            onClick={() => handleDeleteClick()}> 
                            Delete
                        </button>
                    </>
                )
            }
            {
                forms?.length ? (
                    forms.map((form, index) => (
                        <Variant key={index} {...form} />
                    ))
                ) : (
                    <p>No variants</p>
                )
            }
            {
                showModal !== '' && (
                    <dialog open className={style.dialog}>
                        <div>
                            <h2>{showModal}</h2>
                            <form method="dialog">
                                <button onClick={() => window.location.reload()}>OK</button>
                            </form>
                        </div>
                    </dialog>
                )
            }
            {
                pokemon && deleteConfirm && (
                    <dialog open className={style.dialog}>
                        <div>
                            <h2>Are you sure you wan't to delete #{pokemon.pokemon_id} {pokemon.pokemon_name} ?</h2>
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