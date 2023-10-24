import style from '@/styles/variant.module.css'
import Pokemon from '@/interfaces/Pokemon'
import VariantInterface from '@/interfaces/Variant'
import { FormEvent, useState } from 'react'

interface AddVariantFormProps {
    pokemonId: number,
    onAddClick: (newVariant: VariantInterface) => void
}

export default function AddVariantForm({ pokemonId, onAddClick }: AddVariantFormProps) {
    const [variant, setVariant] = useState<VariantInterface>({
        pokemonId: pokemonId,
        form: '',
        base_attack: 1,
        base_defense: 1,
        base_stamina: 1
    })
    const [error, setError] = useState<string | null>(null)


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onAddClick(variant)
    }

    return (
        <>
            <h2>Add new Variant</h2>
            {
                error && <p>{error}</p>
            }
            <form onSubmit={handleSubmit}>
                <div className={style.inputelement}>
                    <label>Form</label>
                    <input 
                        type="text"
                        value={variant.form}
                        onChange={(e) => setVariant(prevState => ({
                            ...prevState,
                            form: e.target.value
                        }))} />
                </div>
                <div className={style.inputelement}>
                    <label>Base attack</label>
                    <input
                        type="number"
                        min={1}
                        value={variant.base_attack.toString()}
                        onChange={(e) => {
                            const value = parseInt(e.target.value)
                            if (isNaN(value) || value < 1 || value > 999) {
                                setError('Please enter a valid number between 1 and 999.')
                                return
                            }
                            setError(null)
                            setVariant(prevState => ({
                                ...prevState,
                                base_attack: e.target.valueAsNumber
                            }))
                        }} />  
                </div>
                <div className={style.inputelement}>
                    <label>Base defense</label>
                    <input
                        type="number"
                        min={1}
                        value={variant.base_defense.toString()}
                        onChange={(e) => {
                            const value = parseInt(e.target.value)
                            if (isNaN(value) || value < 1 || value > 999) {
                                setError('Please enter a valid number between 1 and 999.')
                                return
                            }
                            setError(null)
                            setVariant(prevState => ({
                                ...prevState,
                                base_defense: e.target.valueAsNumber
                            }))
                        }} />               
                </div>
                <div className={style.inputelement}>
                    <label>Base stamina</label>
                    <input
                        type="number"
                        min={1}
                        value={variant.base_stamina.toString()}
                        onChange={(e) => {
                            const value = parseInt(e.target.value)
                            if (isNaN(value) || value < 1 || value > 999) {
                                setError('Please enter a valid number between 1 and 999.')
                                return
                            }
                            setError(null)
                            setVariant(prevState => ({
                                ...prevState,
                                base_stamina: e.target.valueAsNumber
                            }))
                        }} />   
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem', gap: '1rem' }}>
                    <button className={style.button} type="submit">Add new variant</button>
                </div>
            </form>
        </>
        
    )
}