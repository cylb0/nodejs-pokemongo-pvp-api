import { useState } from 'react'
import style from '@/styles/pokedex.module.css'
import Image from 'next/image'

interface AddPokemonFormProps {
    onAddClick: (pokemonId: number, pokemonName: string, pokemonNameFr: string) => void
}

export default function AddPokemonForm({ onAddClick }: AddPokemonFormProps) {
    const [pokemonId, setPokemonId] = useState<number>(0)
    const [pokemonName, setPokemonName] = useState<string>('')
    const [pokemonNameFr, setPokemonNameFr] = useState<string>('')

    const handleAddClick = () => {
        onAddClick(pokemonId, pokemonName, pokemonNameFr)
        setPokemonId(0)
        setPokemonName('')
        setPokemonNameFr('')
    }
    
    return (
        <tr>
            <td>
                <input
                    className={style.input}
                    type="number"
                    min={1}
                    max={999}
                    value={pokemonId?.toString() || ''}
                    onChange={(e) => setPokemonId(parseInt(e.target.value))} />
            </td>
            <td>
                <input
                    className={style.input}
                    type="text"
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)} />
            </td>
            <td>
                <input
                    className={style.input}
                    type="text"
                    value={pokemonNameFr}
                    onChange={(e) => setPokemonNameFr(e.target.value)} />
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