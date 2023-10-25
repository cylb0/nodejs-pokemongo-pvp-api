import { useState } from 'react'
import Select, { MultiValue } from 'react-select'

import Form from "@/interfaces/Form"

import formStyle from '@/styles/forms.module.css'

interface SearchEvolutionProps {
    data: Form[],
    onAddEvolutionsClick: (selectedOptions: number[] | null) => void
}

export default function SearchEvolution({ data, onAddEvolutionsClick }: SearchEvolutionProps) {
    const [selectedOptions, setSelectedOptions] = useState<number[] | null>(null)

    const options = data.map((variant) => ({
        value: variant.id,
        label: `#${variant.pokemon_id} ${variant.pokemon_name} ${variant.form} form`,
    }))

    const handleClick = () => {
        onAddEvolutionsClick(selectedOptions)
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Select 
                options={options as any}
                value={selectedOptions}
                onChange={(selectedOptions) => setSelectedOptions(selectedOptions as any)}
                isMulti={true}
                placeholder='Select evolutions' />
            <button className={`${formStyle.button} ${formStyle.add}`} onClick={handleClick}>Add Evolutions</button>
        </div>
    )
}