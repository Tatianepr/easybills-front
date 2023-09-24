import './CampoSenha.css'

const CampoSenha = (props) => {

    const placeholderModificada = `${props.placeholder}...`

    const aoDigitado = (evento) => {

        props.aoAlterado(evento.target.value)
    }

    return (
        <div className="campo-senha">
            <label>
                {props.label}
            </label>
            <input value={props.valor} type="password" onChange={aoDigitado} required={props.obrigatorio} placeholder={placeholderModificada}></input>
        </div>
    )

}

export default CampoSenha