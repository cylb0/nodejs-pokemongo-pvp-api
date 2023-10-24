import messagesStyle from '@/styles/usermessages.module.css'
import formStyle from '@/styles/forms.module.css'
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
                error && <p className={messagesStyle.error}>{error}</p>
            }
            <form onSubmit={handleSubmit}>
                <div className={formStyle.inputelement}>
                    <label>Form</label>
                    <input 
                        className={formStyle.input}
                        type="text"
                        value={variant.form}
                        onChange={(e) => setVariant(prevState => ({
                            ...prevState,
                            form: e.target.value
                        }))} />
                </div>
                <div className={formStyle.inputelement}>
                    <label>Base attack</label>
                    <input
                        className={formStyle.input}
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
                <div className={formStyle.inputelement}>
                    <label>Base defense</label>
                    <input
                        className={formStyle.input}
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
                <div className={formStyle.inputelement}>
                    <label>Base stamina</label>
                    <input
                        className={formStyle.input}
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
                    <button className={`${formStyle.button} ${formStyle.add}`} type="submit">Add new variant</button>
                </div>
            </form>
        </>
        
    )
}