import './ListaSuspensa.css'

const ListaSuspensa = (props) => {

    return (
        <div className='Lista-Suspesa'>
            <label>{props.label}</label>
            <select
                onChange={evento => props.aoAlterado(evento.target.value)}
                id={props.nome}
                required={props.required}
                value={props.valor}>
                <option value=""></option>
                {props.itens.map(item => {
                    return <option key={item.id} value={item.id}>{item.nome}</option>
                })}
            </select>
        </div>
    )
}

export default ListaSuspensa