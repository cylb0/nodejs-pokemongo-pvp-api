import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Variant from './Variant'
import Form from '@/interfaces/Form'
import style from '@/styles/pokemon.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Pokemon from '@/interfaces/Pokemon'
import AddVariantForm from './AddVariantForm'
import VariantInterface from '@/interfaces/Variant'

interface Props {
    pokemon_id: number | null
}

export default function Pokemon(props: Props) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [editedPokemon, setEditedPokemon] = useState({})
    const [forms, setForms] = useState<Form[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

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
    }, [pokemon, token, message])

    // Update pokemon   
    const handleSubmit = (e: FormEvent) => {
        setMessage(null)
        setError(null)
        e.preventDefault()
        if (pokemon === null) {
            return
        }
        axios
            .put(`http://localhost:3001/api/pokemon/${pokemon.pokemon_id}`, editedPokemon, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    setMessage(response.data.message)               
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
        setMessage(null)
        setError(null)
        if (pokemon === null) {
            setError('No pokemon to delete.')
            return
        }
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
                setError(error.response.data.message)
            })
    }

    const cancelDelete = () => {
        setDeleteConfirm(false)
    }
    // Add new pokemon form
    const handleAddClick = (newVariant: VariantInterface) => {
        setError(null)
        setMessage(null)
        axios
            .post('http://localhost:3001/api/form', newVariant, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setMessage(response.data.message)
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
            {
                pokemon !== null && (
                    <div className={style.pokemoncard}>
                        <h2 style={{ textAlign: 'center' }}>#{pokemon.pokemon_id} {pokemon.pokemon_name}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={style.inputelement}>
                                <label>Name</label>
                                <input
                                    placeholder={pokemon.pokemon_name} 
                                    type="text" 
                                    onChange={(e) => setEditedPokemon({...editedPokemon, pokemon_name: e.target.value})} />
                            </div>
                            <div className={style.inputelement}>
                                <label>French name</label>
                                <input
                                    placeholder={pokemon.pokemon_name_fr} 
                                    type="text"
                                    onChange={(e) => setEditedPokemon({...editedPokemon, pokemon_name_fr: e.target.value})} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem', gap: '1rem' }}>
                                <button className={style.button} type="submit">Save changes</button>
                            </div>
                        </form>
                        <Image
                            className={style.icon}
                            src={'/icons/delete.png'}
                            width={24}
                            height={24}
                            alt='Delete icon'
                            onClick={() => handleDeleteClick()} />
                    </div>
                )
            }
            {
            <div className={style.variants}>
                <h2 style={{ textAlign: 'center' }}>Variants</h2>
                {
                    pokemon && 
                    <AddVariantForm 
                        pokemonId={pokemon.pokemon_id}
                        onAddClick={handleAddClick}/>
                }
                {
                    forms?.length ? (
                        forms.map((form, index) => (
                            <div key={index} style={{ marginBottom: "1rem" }}>
                                <Variant key={index} {...form} />
                            </div>
                        ))
                    ) : (
                        <p>No variants</p>
                    )
                }
            </div>
            }
            {
                pokemon && deleteConfirm && (
                    <dialog open className={style.dialog}>
                        <div>
                            <h2>Are you sure you wan't to delete #{pokemon.pokemon_id} {pokemon.pokemon_name} ?</h2>
                            <form method="dialog">
                                <button 
                                    className={style.button}
                                    onClick={confirmDelete}>Delete</button>
                                <button 
                                    className={style.button}
                                    onClick={cancelDelete}>Cancel</button>
                            </form>
                        </div>
                    </dialog>
                ) 
            }
        </div>
    )
}