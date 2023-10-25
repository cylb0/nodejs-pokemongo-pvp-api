import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import axios from 'axios'
import Cookies from 'js-cookie'

import Form from '@/interfaces/Form'
import Pokemon from '@/interfaces/Pokemon'
import VariantInterface from '@/interfaces/Variant'

import Variant from './Variant'
import AddVariantForm from './AddVariantForm'
import PokemonBrowser from './PokemonBrowser'

import style from '@/styles/pokemon.module.css'
import UIStyle from '@/styles/usermessages.module.css'
import formStyle from '@/styles/forms.module.css'
import Link from 'next/link'


interface PokemonProps {
    pokemon_id: number | null,
    previousId: number | null,
    nextId: number | null
}

export default function Pokemon({ pokemon_id, previousId, nextId }: PokemonProps) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [editedPokemon, setEditedPokemon] = useState({})
    const [forms, setForms] = useState<Form[] | null>(null)
    const [allForms, setAllForms] = useState<Form[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
    const router = useRouter()
    const token = Cookies.get('token')

    
    // Fetch pokemon data
    useEffect(() => {
        axios.get(`http://localhost:3001/api/pokemon/${pokemon_id}`, {
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
    }, [pokemon_id, token])

    // Fetch all forms
    useEffect(() => {
        axios
            .get('http://localhost:3001/api/form', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    setAllForms(response.data.data)
                }
            })
            .catch(error => {
                setError(error.response.data.message)
            })
    }, [])

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
    }, [pokemon, message])

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
                if(response.status === 200) {
                    setMessage(response.data.message)
                }
            })
            .catch(error => {
                setError(error.response.data.message)
            })
    }

    return (
        <div className={style.container}>
            <PokemonBrowser previousId={previousId} nextId={nextId}/>
            {
                error && <p className={UIStyle.error}>{error}</p>
            }
            {
                message && <p className={UIStyle.message}>{message}</p>
            }
            {
                pokemon !== null && (
                    <div className={style.pokemoncard}>
                        <h2 style={{ textAlign: 'center' }}>#{pokemon.pokemon_id} {pokemon.pokemon_name}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={formStyle.inputelement}>
                                <label>Name</label>
                                <input
                                    className={formStyle.input}
                                    placeholder={pokemon.pokemon_name} 
                                    type="text" 
                                    onChange={(e) => setEditedPokemon({...editedPokemon, pokemon_name: e.target.value})} />
                            </div>
                            <div className={formStyle.inputelement}>
                                <label>French name</label>
                                <input
                                    className={formStyle.input}
                                    placeholder={pokemon.pokemon_name_fr} 
                                    type="text"
                                    onChange={(e) => setEditedPokemon({...editedPokemon, pokemon_name_fr: e.target.value})} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem', gap: '1rem' }}>
                                <button className={`${formStyle.button} ${formStyle.edit}`} type="submit">Save changes</button>
                            </div>
                        </form>

                        <button className={`${formStyle.button} ${formStyle.delete}`} onClick={handleDeleteClick}>Delete pokemon</button>        
                    
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
                    forms?.length && allForms?.length ? (
                        forms.map((form) => (
                            <div key={form.id} style={{ marginBottom: "1rem" }}>
                                <Variant key={form.id} form={form} allForms={allForms}/>
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
                    <dialog open className={UIStyle.dialog}>
                        <div>
                            <h2>Are you sure you wan't to delete #{pokemon.pokemon_id} {pokemon.pokemon_name} ?</h2>
                            <form method="dialog">
                                <button 
                                    className={`${formStyle.button} ${formStyle.delete}`}
                                    onClick={confirmDelete}>Delete</button>
                                <button 
                                    className={formStyle.button}
                                    onClick={cancelDelete}>Cancel</button>
                            </form>
                        </div>
                    </dialog>
                ) 
            }
        </div>
    )
}