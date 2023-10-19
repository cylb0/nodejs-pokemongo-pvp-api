import Form from "@/interfaces/Form"
import style from '@/styles/variant.module.css'
import { FormEvent, useState } from 'react'
import axios from "axios"
import Cookies from 'js-cookie'
import { useRouter } from "next/router"
import { edit } from "helpers"

export default function Variant(props: Form) {
    const [editedForm, setEditedForm] = useState({})
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
        console.log(editedForm)
        axios
            .put(`http://localhost:3001/api/form/${props.id}`, editedForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data.message)
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
        <>
            {
                error && <p>{error}</p>
            }
            <form onSubmit={handleSubmit}>
                <h2>
                    <input 
                        type="text"
                        placeholder={props.form}
                        onChange={(e) => setEditedForm({...editedForm, form: e.target.value})} /> form
                </h2>
                <p>Base stats:</p>
                <p>Attack: 
                    <b><span>
                        <input 
                            type="number"
                            min={1}
                            placeholder={props.base_attack.toString()}
                            onChange={(e) => setEditedForm({...editedForm, base_attack: e.target.value})} /> 
                    </span></b> |
                    Defense :<b><span>
                        <input 
                            type="number"
                            min={1}
                            placeholder={props.base_defense.toString()}
                            onChange={(e) => setEditedForm({...editedForm, base_defense: e.target.value})} />
                    </span></b> |
                    Stamina :<b><span>
                        <input 
                            type="number"
                            min={1}
                            placeholder={props.base_stamina.toString()}
                            onChange={(e) => setEditedForm({...editedForm, base_stamina: e.target.value})} />
                    </span></b>
                </p>
                <button type="submit">Save changes</button>
            </form>
            <button 
                onClick={() => handleDeleteClick()}> 
                Delete
            </button>

            {
                showModal !== '' && (
                    <dialog open className={style.dialog}>
                        <div>
                            <h2>{showModal}</h2>
                            <form method="dialog">
                                <button onClick={() => router.reload()}>OK</button>
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