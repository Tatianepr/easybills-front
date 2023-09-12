import { useState } from 'react'
import './CampoNum.css'

const CampoNum = (props) => {

    const placeholderModificada = `${props.placeholder}...`

    const aoDigitado = (evento) => {

        props.aoAlterado(evento.target.value)
    }

    return (
        <div className="campo-num">
            <label>
                {props.label}
            </label>
            <input type="number" value={props.valor} onChange={aoDigitado} required={props.obrigatorio} placeholder={placeholderModificada}></input>
        </div>
    )

}

export default CampoNum