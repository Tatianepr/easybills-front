import './Lancamento.css'
import LancamentoItem from '../LancamentoItem/index.js';

const Lancamento = (props) => {
    return (
        /*(props.lancamentos.length > 0) ?*/

        <section className='lancamento'>
            
            <table>
                <thead>
                    <tr>
                        <th># ID</th>
                        <th>Tipo</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Vencimento</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.lancamentos.map(
                        lancamento =>
                            <LancamentoItem
                                key={lancamento.id}
                                id={lancamento.id}
                                transacao={lancamento.tipo}
                                descricao={lancamento.descricao}
                                categoria={lancamento.categoria_nome}
                                categoria_id={lancamento.categoria_id}
                                valor={parseFloat(lancamento.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                vencimento={lancamento.data_vencimento}
                                pago={lancamento.pago}
                                cores={props.transacoes}
                                aoLancamentoExcluido={() => props.aoLancamentoExcluido(lancamento.id)}
                                aoLancamentoPago={() => props.aoLancamentoPago(lancamento.id)}
                                aoLancamentoEditado={() => props.aoLancamentoEditado(lancamento.id)}
                            />)}
                </tbody>
            </table>
        </section>

    );
}

export default Lancamento

