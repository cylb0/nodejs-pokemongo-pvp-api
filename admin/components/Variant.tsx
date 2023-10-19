import Form from "@/interfaces/Form"

export default function Variant(props: Form) {
    return (
        <>
            <h2>{props.form} form</h2>
            <p>Base stats: 
                    Attack: <b><span>{ props.base_attack }</span></b> |
                    Defense: <b><span>{ props.base_defense }</span></b> |
                    Stamina: <b><span>{ props.base_stamina }</span></b>
            </p>
            
        </>
    )
}