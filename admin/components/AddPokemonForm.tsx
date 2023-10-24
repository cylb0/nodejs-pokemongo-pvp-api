import { useState } from 'react'
import Image from 'next/image'

import Pokemon from '@/interfaces/Pokemon'

import style from '@/styles/pokedex.module.css'
import formStyle from '@/styles/forms.module.css'

interface AddPokemonFormProps {
    onAddClick: (newPokemon: Pokemon) => void
}

export default function AddPokemonForm({ onAddClick }: AddPokemonFormProps) {
    const [newPokemon, setNewPokemon] = useState<Pokemon>({
        pokemon_id: 0,
        pokemon_name: '',
        pokemon_name_fr: ''
    })

    const handleAddClick = () => {
        onAddClick(newPokemon)
        setNewPokemon({
            pokemon_id: 0,
            pokemon_name: '',
            pokemon_name_fr: ''
        })
    }

    return (
        <tr>
            <td>
                <input
                    className={formStyle.input}
                    type="number"
                    min={1}
                    max={999}
                    value={newPokemon.pokemon_id?.toString()}
                    onChange={(e) => setNewPokemon(prevState => {
                        return {
                            ... prevState, pokemon_id: parseInt(e.target.value)
                        }
                    })} />
            </td>
            <td>
                <input
                    className={formStyle.input}
                    type="text"
                    value={newPokemon.pokemon_name}
                    onChange={(e) => setNewPokemon(prevState => {
                        return {
                            ... prevState, pokemon_name: e.target.value
                        }
                    })} />
            </td>
            <td>
                <input
                    className={formStyle.input}
                    type="text"
                    value={newPokemon.pokemon_name_fr}
                    onChange={(e) => setNewPokemon(prevState => {
                        return {
                            ... prevState, pokemon_name_fr: e.target.value
                        }
                    })} />
            </td>
            <td>
                <Image 
                    className={style.icon}
                    src={'/icons/plus.png'}
                    width={24}
                    height={24}
                    alt='Icon add'
                    onClick={handleAddClick}
                    style={{cursor: 'pointer' }}/>
            </td>
        </tr>
    )
}