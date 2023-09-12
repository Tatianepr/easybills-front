import { useState } from 'react'
import './CampoTexto.css'

const CampoTexto = (props) => {

    const placeholderModificada = `${props.placeholder}...`

    //let valor = 'Tatiane'
    // a variavel valor é para ler e a variavel setValor é usada para escrever
    //const [valor, setValor] = useState('Tatiane')

    const aoDigitado = (evento) => {
        //setValor(evento.target.value)
        //console.log(valor)
        props.aoAlterado(evento.target.value)
    }

    return (
        <div className="campo-texto">
            <label>
                {props.label}
            </label>
            <input value={props.valor} onChange={aoDigitado} required={props.obrigatorio} placeholder={placeholderModificada}></input>
        </div>
    )

}

export default CampoTexto