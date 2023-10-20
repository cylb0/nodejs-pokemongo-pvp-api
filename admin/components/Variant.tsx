import Form from "@/interfaces/Form"
import style from '@/styles/variant.module.css'
import { FormEvent, useState } from 'react'
import axios from "axios"
import Cookies from 'js-cookie'
import { useRouter } from "next/router"
import Image from 'next/image'

export default function Variant(props: Form) {
    const [form, setForm] = useState<string>(props.form)
    const [baseAtk, setBaseAtk] = useState<number>(props.base_attack)
    const [baseDef, setBaseDef] = useState<number>(props.base_defense)
    const [baseSta, setBaseSta] = useState<number>(props.base_stamina)
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const token = Cookies.get('token')
    const router = useRouter()

    const handleDeleteClick = () => {
        setDeleteConfirm(true)
    }

    const confirmDelete = () => {
        axios
            .delete(`http://localhost:3001/api/form/${props.id}`, {
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
            .put(`http://localhost:3001/api/form/${props.id}`, editedForm, {
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

    return (
        <div className={style.variantcard}>
            {
                error && <p>{error}</p>
            }
            <form onSubmit={handleSubmit}>
                <div className={style.inputelement}>
                    <label>Form</label>
                    <input 
                        type="text"
                        value={form}
                        onChange={(e) => setForm(e.target.value)} />
                </div>
                <div className={style.inputelement}>
                    <label>Base attack</label>
                    <input
                        type="number"
                        min={1}
                        value={baseAtk}
                        onChange={(e) => setBaseAtk(e.target.value)} />
                </div>
                <div className={style.inputelement}>
                    <label>Base defense</label>
                    <input
                        type="number"
                        min={1}
                        value={baseDef}
                        onChange={(e) => setBaseDef(e.target.value)} />
                </div>
                <div className={style.inputelement}>
                    <label>Base stamina</label>
                    <input
                        type="number"
                        min={1}
                        value={baseSta}
                        onChange={(e) => setBaseSta(e.target.value)} />
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

            {
                showModal !== '' && (
                    <dialog open className={style.dialog}>
                        <div>
                            <h2>{showModal}</h2>
                            <form method="dialog">
                                <button 
                                    className={style.button} 
                                    onClick={() => router.reload()}>OK</button>
                            </form>
                        </div>
                    </dialog>
                )
            }

            {
                deleteConfirm && (
                    <dialog open className={style.dialog}>
                        <div>
                            <h2>Are you sure you wan't to delete #{props.pokemon_id} {props.pokemon_name} {props.form} form ?</h2>
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