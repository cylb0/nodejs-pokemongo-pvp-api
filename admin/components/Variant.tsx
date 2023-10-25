import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router"

import axios from "axios"
import Cookies from 'js-cookie'

import SearchEvolution from '@/components/SearchEvolution'

import Form from "@/interfaces/Form"

import style from '@/styles/variant.module.css'
import formStyle from '@/styles/forms.module.css'
import UIStyle from '@/styles/usermessages.module.css'

interface EvolutionInterface {
    id: number,
    formId: number,
    pokemonId: number,
    pokemon_name: string,
    form: string
}

interface VariantProps {
    form: Form,
    allForms: Form[]
}

export default function Variant(props: VariantProps) {
    const [form, setForm] = useState<string>(props.form.form)
    const [baseAtk, setBaseAtk] = useState<number>(props.form.base_attack)
    const [baseDef, setBaseDef] = useState<number>(props.form.base_defense)
    const [baseSta, setBaseSta] = useState<number>(props.form.base_stamina)
    const [evolutions, setEvolutions] = useState<EvolutionInterface[]>([])

    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const token = Cookies.get('token')
    const router = useRouter()

    // Fetch evolutions
    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/evolution?id=${props.form.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    setEvolutions(response.data.data)
                }
            })
            .catch(error => {
                setError(error.response.data.message)
            })
    }, [message])

    const handleVariantDeleteClick = () => {
        setDeleteConfirm(true)
    }

    const confirmDelete = () => {
        axios
            .delete(`http://localhost:3001/api/form/${props.form.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                router.reload()
            })
            .catch(error => {
                setError(error.response.data.message)
            })
    }

    const cancelDelete = () => {
        setDeleteConfirm(false)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const editedForm = {form: form, base_attack: baseAtk, base_defense: baseDef, base_stamina: baseSta}
        axios
            .put(`http://localhost:3001/api/form/${props.form.id}`, editedForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    setShowModal(response.data.message)               
                } else {
                    setError('Failed to update form.')
                }
            })
            .catch(error => {
                setError(error.response.data.message)
            })
    }

    interface Evo {
        value: number,
        label: string
    }

    const handleEvolutionsAddClick = (selectedOptions: number[]| null) => {
        setError(null)
        setMessage(null)
        selectedOptions?.map((option) => {
            console.log('OPTION:',option)
            console.log('EVOLUTION STATE:',evolutions)
            const existingEvolution = evolutions.find((evolution) => evolution.formId === option.value)
            console.log(existingEvolution)
            if (!existingEvolution) {
                const newEvolution = {
                    fromId: props.form.id,
                    toId: option.value
                }
                axios
                    .post(`http://localhost:3001/api/evolution`, newEvolution, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        if (response.status === 200) {
                            setMessage(response.data.message)
                        } else {
                            setError('There was an issue when adding the evolution, please try again.')
                        }
                    })
                    .catch(error => {
                        setError(error.response.data.message)
                    })
            }
        })
    }

    const handleEvolutionDeleteClick = (id: number) => {
        axios
        .delete(`http://localhost:3001/api/evolution/${id}`, {
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
        <div className={style.variantcard}>
            {
                error && <p className={UIStyle.error}>{error}</p>
            }
            {
                message && <p className={UIStyle.message}>{message}</p>
            }
            <h2>#{props.form.pokemon_id} {props.form.pokemon_name} {props.form.form} form</h2>
            <form onSubmit={handleSubmit}>
                <div className={formStyle.inputelement}>
                    <label>Form</label>
                    <input
                        className={formStyle.input} 
                        type="text"
                        value={form}
                        onChange={(e) => setForm(e.target.value)} />
                </div>
                <div className={formStyle.inputelement}>
                    <label>Base attack</label>
                    <input
                        className={formStyle.input} 
                        type="number"
                        min={0}
                        value={baseAtk.toString()}
                        onChange={(e) => {
                            const value = parseInt(e.target.value)
                            if (isNaN(value) || value < 1 || value > 999) {
                                setError('Please enter a valid number between 1 and 999.')
                                return
                            }
                            setError(null)
                            setBaseAtk(e.target.valueAsNumber)
                        }} />
                </div>
                <div className={formStyle.inputelement}>
                    <label>Base defense</label>
                    <input
                        className={formStyle.input} 
                        type="number"
                        min={1}
                        value={baseDef.toString()}
                        onChange={(e) => {
                            const value = parseInt(e.target.value)
                            if (isNaN(value) || value < 1 || value > 999) {
                                setError('Please enter a valid number between 1 and 999.')
                                return
                            }
                            setError(null)
                            setBaseDef(e.target.valueAsNumber)
                        }} />
                </div>
                <div className={formStyle.inputelement}>
                    <label>Base stamina</label>
                    <input
                        className={formStyle.input} 
                        type="number"
                        min={1}
                        value={baseSta.toString()}
                        onChange={(e) => {
                            const value = parseInt(e.target.value)
                            if (isNaN(value) || value < 1 || value > 999) {
                                setError('Please enter a valid number between 1 and 999.')
                                return
                            }
                            setError(null)
                            setBaseSta(e.target.valueAsNumber)
                        }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem', gap: '1rem' }}>
                    <button className={`${formStyle.button} ${formStyle.edit}`} type="submit">Save changes</button>
                </div>
            </form>
            <p>Evolutions :</p>
            {
                evolutions.length ? (
                    evolutions.map(evolution => (
                        <div
                            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap:'1rem'}}
                            key={evolution.id}>

                            <Link key={evolution.id} href={`/pokemon/${evolution.pokemonId}`}>
                                <p>#{evolution.pokemonId} {evolution.pokemon_name} {evolution.form} form</p>
                            </Link>
                            <Image 
                                className={style.icon}
                                src={'/icons/delete.png'}
                                width={24}
                                height={24}
                                alt='Delete icon'
                                onClick={() => {handleEvolutionDeleteClick(evolution.id)}} />
                        </div>
                        
                    ))
                ) : (
                    <p>No evolutions</p>
                )
            }
            <SearchEvolution data={props.allForms} onAddEvolutionsClick={handleEvolutionsAddClick} />

            <button className={`${formStyle.button} ${formStyle.delete}`} onClick={handleVariantDeleteClick}>Delete form</button>        

            {
                showModal !== '' && (
                    <dialog open className={UIStyle.dialog}>
                        <div>
                            <h2>{showModal}</h2>
                            <form method="dialog">
                                <button 
                                    className={formStyle.button} 
                                    onClick={() => router.reload()}>OK</button>
                            </form>
                        </div>
                    </dialog>
                )
            }

            {
                deleteConfirm && (
                    <dialog open className={UIStyle.dialog}>
                        <div>
                            <h2>Are you sure you wan't to delete #{props.form.pokemon_id} {props.form.pokemon_name} {props.form.form} form ?</h2>
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